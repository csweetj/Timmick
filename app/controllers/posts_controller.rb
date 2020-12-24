class PostsController < ApplicationController
  before_action :authenticate_user!, except: %i[show index]
  before_action :set_post, only: %i[show edit update destroy]

  def index
    # N+1問題対策
    @posts = Post.includes(:user).order('created_at DESC')
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.includes(:user).order('created_at DESC')
  end

  def new
    @post = Post.new
  end

  def edit; end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: '作成できました。' }
        format.json { render :index, status: :created }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: '更新できました。' }
        format.json { render :index, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: '削除できました。' }
      format.json { head :no_content }
    end
  end

  def like
    post = Post.find(params[:id])
    if post.liked_by?(current_user)
      like = current_user.likes.find_by(post_id: post.id)
      like.destroy
      render json: post.id
    else
      like = current_user.likes.new(post_id: post.id)
      like.save
      render json: post.id
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body, feature_images: [])
  end
end
