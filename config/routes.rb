Rails.application.routes.draw do
  root to: 'posts#index'
  resources :posts
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #タイマーページ用ルーティング
  get "timers/study" => "timers#study"
  get "timers/relax" => "timers#relax"
  get "timers/fitness" => "timers#fitness"
  get "timers/game" => "timers#game"
end
