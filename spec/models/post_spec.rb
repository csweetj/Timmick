require 'rails_helper'

RSpec.describe Post, type: :model do
  before do
    @post = FactoryBot.build(:post)
  end

  describe '記事投稿' do
    context '記事投稿できるとき' do
      it '全ての情報を適切に入力すれば記事投稿できること' do
        expect(@post).to be_valid
      end

      it '画像が無くても記事があれば記事投稿できること' do
        @post.feature_images = nil
        expect(@post).to be_valid
      end
      
      it 'タグが無くても記事があれば記事投稿できること' do
        @post.tag_list = nil
        expect(@post).to be_valid
      end
    end

    context '記事投稿できないとき' do
      it 'タイトル・本文どちらも必須であること' do
        @post.title = ""
        @post.body = ""
        @post.valid?
        expect(@post.errors.full_messages).to include('タイトルを入力してください')
        expect(@post.errors.full_messages).to include('本文を入力してください')
      end

      it 'タイトルは30文字以内であること' do
        @post.title = 'a' * 31
        @post.valid?
        expect(@post.errors.full_messages).to include('タイトルは30文字以内で入力してください')
      end

      it '本文は140文字以内であること' do
        @post.body = 'a' * 141
        @post.valid?
        expect(@post.errors.full_messages).to include('本文は140文字以内で入力してください')
      end

      it '画像の拡張子は.jpeg, .jpg, .gif, .png,以外では登録できないこと' do
        @post.feature_images = nil
        file = fixture_file_upload('/files/test.bmp', 'image/bmp')
        @post.feature_images.attach(file)
        @post.valid?
        expect(@post.errors.full_messages).to include('画像のContent Typeが不正です')
      end

      it '画像は4枚以上一度に保存できないこと' do
        @post.feature_images = nil
        file = fixture_file_upload('/files/test.png', 'image/png')
        5.times do
          @post.feature_images.attach(file)
        end
        @post.valid?
        expect(@post.errors.full_messages).to include('画像の数が許容範囲外です')
      end
    end
  end
end
