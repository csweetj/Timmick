class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[nickname career_id
                                                         gender_id birthday avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[nickname career_id
                                                                gender_id birthday avatar])
  end
end
