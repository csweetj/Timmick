require 'rails_helper'

RSpec.describe "Posts", type: :system do
  describe '新規投稿' do
    before do
      @post = FactoryBot.build(:post)
      @user = FactoryBot.build(:user)
    end

    context '投稿できる時' do
      it 'ログインしているユーザーには新規投稿が表示されること' do
        @user.save
        visit new_user_session_path
        fill_in 'user_email', with: @user.email
        fill_in 'user_password', with: @user.password
        click_on("log-in")
        expect(page).to have_content('新規投稿')
      end
    end

    context '投稿できない時' do
      it 'ログインしていないユーザーには新規投稿が表示されないこと' do
        visit root_path
        expect(page).to have_no_content('新規投稿')
      end

      it '投稿に失敗すると、ページ遷移なくページにとどまる' do
        @user.save
        visit new_user_session_path
        fill_in 'user_email', with: @user.email
        fill_in 'user_password', with: @user.password
        click_on("log-in")
        click_on('新規投稿')
        click_on('作成する')
        expect(current_path).to eq posts_path
      end
    end
  end

  describe '投稿編集・削除' do
    before do
      @user = FactoryBot.build(:user)
    end
  
    context '投稿削除できる時' do
      it '作成者が削除ボタンが表示されること' do
        @user.save
        @post = FactoryBot.build(:post, user_id: @user.id)
        @post.save
        visit new_user_session_path
        fill_in 'user_email', with: @user.email
        fill_in 'user_password', with: @user.password
        click_on("log-in")
        visit post_path(@post)
        expect(page).to have_content('削除')
      end
    end

    context '投稿編集できる時' do
      it '作成者が編集ボタンが表示されること' do
        @user.save
        @post = FactoryBot.build(:post, user_id: @user.id)
        @post.save
        visit new_user_session_path
        fill_in 'user_email', with: @user.email
        fill_in 'user_password', with: @user.password
        click_on("log-in")
        visit post_path(@post)
        expect(page).to have_content('編集')
      end
    end
  end
end
