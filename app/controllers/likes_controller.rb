class LikesController < ApplicationController
  before_action :set_post
  before_action :authenticate_user!

  def create
    @like = Like.create(user_id: current_user.id, post_id: @post.id)
  end

  def destroy
    like = Like.find_by(user_id: current_user.id, post_id: params[:post_id])
    like.destroy
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end

