Rails.application.routes.draw do
  root to: 'posts#index'
  devise_for :users
  
  resources :posts, shallow: true do
    resources :likes, only: %i[create destroy]
    resources :comments, only: %i[create edit update destroy]
  end
  
  #タイマー機能用ルーティング
  get "timers/study" => "timers#study"
  get "timers/relax" => "timers#relax"
  get "timers/fitness" => "timers#fitness"
  get "timers/hobby" => "timers#hobby"
end
