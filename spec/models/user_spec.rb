require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'ユーザー登録' do
    before do
      @user = FactoryBot.build(:user)
    end

    context 'ユーザー登録できるとき' do
      it '全ての情報を適切に入力すれば新規登録できること' do
        expect(@user).to be_valid
      end
    end

    context 'ユーザー登録できないとき' do
      it 'ニックネームが必須であること' do
        @user.nickname = nil
        @user.valid?
        expect(@user.errors.full_messages).to include('ニックネームを入力してください')
      end

      it 'ニックネームは11文字以上は登録できないこと' do
        @user.nickname = '12345678901'
        @user.valid?
        expect(@user.errors.full_messages).to include('ニックネームは10文字以内で入力してください')
      end

      it 'メールアドレスが必須であること' do
        @user.email = nil
        @user.valid?
        expect(@user.errors.full_messages).to include('Eメールを入力してください')
      end

      it '職業・性別選択が必須であること' do
        @user.career_id = nil
        @user.gender_id = nil
        @user.valid?
        expect(@user.errors.full_messages).to include('職業を入力してください')
        expect(@user.errors.full_messages).to include('性別を入力してください')
      end

      it 'メールアドレスが一意性であること' do
        @user.save
        another_user = FactoryBot.build(:user)
        another_user.email = @user.email
        another_user.valid?
        expect(another_user.errors.full_messages).to include("Eメールはすでに存在します")
      end

      it 'メールアドレスは、@を含む必要があること' do
        @user.email = '123456'
        @user.valid?
        expect(@user.errors.full_messages).to include('Eメールは不正な値です')
      end

      it 'パスワードが必須であること' do
        @user.password = nil
        @user.valid?
        expect(@user.errors.full_messages).to include('パスワードを入力してください')
      end

      it 'パスワードは、6文字以上での入力が必須であること' do
        @user.password = 'abc12'
        @user.password_confirmation = @user.password
        @user.valid?
        expect(@user.errors.full_messages).to include('パスワードは6文字以上で入力してください')
      end

      it 'パスワードは、全角文字では保存できないこと' do
        @user.password = '１２３ABC'
        @user.password_confirmation = @user.password
        @user.valid?
        expect(@user.errors.full_messages).to include('パスワードは英数字を含め半角で入力してください')
      end

      it 'パスワードとパスワード（確認用）、値の一致が必須であること' do
        @user.password_confirmation = ''
        @user.valid?
        expect(@user.errors.full_messages).to include('パスワード（確認用）とパスワードの入力が一致しません')
      end
    end
  end
end
