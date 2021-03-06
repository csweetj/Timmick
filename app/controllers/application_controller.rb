class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_search

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[nickname career_id
                                                         gender_id birthday avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[nickname career_id
                                                                gender_id birthday avatar])
  end

  def set_search
    @search = Post.ransack(params[:q])
    @search_posts = @search.result(distinct: true).order(created_at: "DESC").includes(:user).page(params[:page]).per(15) # productsの検索結果一覧 
  end
end
