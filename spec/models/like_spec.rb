require 'rails_helper'

RSpec.describe Like, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @post = FactoryBot.create(:post)
    @like = FactoryBot.build(:like, user_id: @user.id, post_id: @post.id)
  end

  describe 'いいね機能' do
    context 'いいねできるとき' do
      it 'いいねを保存するにはuser_idとpost_idが必須であること' do
        expect(@like).to be_valid
      end
    end

    context 'いいねできないとき' do
      it '1人のユーザーは１つの投稿に対して、１つしかいいねをつけれないこと' do
        @like.save
        another_like = FactoryBot.build(:like, user_id: @user.id, post_id: @post.id)
        another_like.valid?
        expect(another_like.errors.full_messages).to include('Postはすでに存在します')
      end
    end
  end
end
