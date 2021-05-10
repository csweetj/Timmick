require 'rails_helper'

RSpec.describe Comment, type: :model do
  before do
    @comment = FactoryBot.build(:comment)
  end

  describe 'コメント投稿' do
    context 'コメント投稿できるとき' do
      it '全ての情報を適切に入力すればコメント投稿できること' do
        expect(@comment).to be_valid
      end
    end

    context 'コメント投稿できないとき' do
      it 'コメントは140文字以内であること' do
        @comment.body = 'a' * 141
        @comment.valid?
        expect(@comment.errors.full_messages).to include('コメントは140文字以内で入力してください')
      end
    end
  end
end
