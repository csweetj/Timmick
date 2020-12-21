Rails.application.routes.draw do
  root to: 'posts#index'
  devise_for :users
  
  resources :posts do
    resource :likes, only: [:create, :destroy]
  end
  
  #タイマー機能用ルーティング
  get "timers/study" => "timers#study"
  get "timers/relax" => "timers#relax"
  get "timers/fitness" => "timers#fitness"
  get "timers/hobby" => "timers#hobby"
end
