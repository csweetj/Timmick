class TimersController < ApplicationController
  before_action :authenticate_user!, only: %i[study_create relax_create fitness_create hobby_create]
  
  
  def study; end

  def relax; end

  def fitness; end

  def hobby; end

  def study_create
    @timer = Timer.new(timer_params)
    @timer.user_id = current_user.id
    if @timer.save
      flash[:notice] = '登録が完了しました。'
      redirect_to action: :study
    end
  end

  def relax_create
    @timer = Timer.new(timer_params)
    @timer.user_id = current_user.id
    if @timer.save
      flash[:notice] = "登録が完了しました。"
      redirect_to action: :relax
    end
  end

  def fitness_create
    @timer = Timer.new(timer_params)
    @timer.user_id = current_user.id
    if @timer.save
      flash[:notice] = "登録が完了しました。"
      redirect_to action: :fitness
    end
  end
  
  def hobby_create
    @timer = Timer.new(timer_params)
    @timer.user_id = current_user.id
    if @timer.save
      flash[:notice] = "登録が完了しました。"
      redirect_to action: :hobby
    end
  end

  private

  def timer_params
    params.permit(:count, :genre_id)
  end
end
