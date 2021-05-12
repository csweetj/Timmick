require 'rails_helper'

RSpec.describe 'Users', type: :system do
  describe 'ユーザー登録・ログイン認証' do
    before do
      @user = FactoryBot.build(:user)
    end

    context '新規登録、ログインできるとき' do
      it 'ログインできるとトップページに遷移すること' do
        @user.save
        visit new_user_session_path
        fill_in 'user_email', with: @user.email
        fill_in 'user_password', with: @user.password
        click_on("log-in")
        expect(current_path).to eq root_path
      end
      
      it '新規登録ができるとトップページに遷移すること' do
        visit new_user_registration_path
        fill_in 'user_nickname', with: @user.nickname
        fill_in 'user_email', with: @user.email
        fill_in 'user_password', with: @user.password
        fill_in 'user_password_confirmation', with: @user.password
        find("#user_career_id").find("option[value='2']").select_option
        find("#user_gender_id").find("option[value='2']").select_option
        image_path = Rails.root.join('public/images/test_image.png')
        attach_file('user_avatar', image_path)
        expect { click_on('登録') }.to change { User.count }.by(1)
        expect(current_path).to eq root_path
      end

    end

    context '新規登録、ログインできないとき' do
      it '新規登録に失敗すると再び新規登録画面に戻ってくること' do
        visit new_user_registration_path
        click_on('登録')
        expect(current_path).to eq user_registration_path
      end

      it 'ログインに失敗するとログイン画面に戻ってくること' do
        visit new_user_session_path
        click_on('log-in')
        expect(current_path).to eq new_user_session_path
      end
    end
  end
end