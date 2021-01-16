class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @posts = @user.posts.with_attached_feature_images.includes(:likes, :comments, :taggings).order('created_at DESC').page(params[:page]).per(6)
    # いいね合計数取得
    @likes_count = 0
    @posts.each do |post|
      @likes_count += post.likes.length
    end
  end
end
