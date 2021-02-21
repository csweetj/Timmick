class UsersController < ApplicationController
  before_action :set_user

  def show
    @posts = @user.posts.with_attached_feature_images.includes(:likes, :comments, :taggings).order('created_at DESC').page(params[:page]).per(6)
    # ユーザーのタイマー合計取得
    @timers = @user.timers.all
    # いいね合計数取得
    @likes_count = 0
    @posts.each do |post|
      @likes_count += post.likes.length
    end
  end

  def following
    #@userがフォローしているユーザー
    @users = @user.following
    render 'show_follow'
end

def followers
    #@userをフォローしているユーザー
    @users = @user.followers
    render 'show_follower'
end

private

  def set_user
    @user  = User.find(params[:id])
  end

end
