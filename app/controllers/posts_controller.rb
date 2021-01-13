class PostsController < ApplicationController
  before_action :authenticate_user!, except: %i[show index]
  before_action :set_post, only: %i[show edit update destroy]

  def index
    # N+1問題対策
    @posts = Post.with_attached_feature_images.includes(:user, :likes, :comments, :taggings).order('created_at DESC').page(params[:page]).without_count.per(15)
    @tags = Post.tags_on(:tags).most_used(20)
    # タグ投稿絞り
    if params[:tag_list]
      @posts = Post.with_attached_feature_images.tagged_with(params[:tag_list]).includes(:user, :likes, :comments, :taggings).order('created_at DESC').page(params[:page]).per(15)
      @tag = params[:tag_list]
    end
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.includes(:user).order('created_at DESC').page(params[:page]).per(10)
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

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body, :tag_list, feature_images: [])
  end

end
