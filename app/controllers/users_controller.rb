class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @posts = @user.posts.includes(:user, :likes, :comments, :feature_images_attachments, :taggings).order('created_at DESC').page(params[:page]).per(6)
  end
end
