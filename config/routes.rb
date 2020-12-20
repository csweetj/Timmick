Rails.application.routes.draw do
  root to: 'posts#index'
  resources :posts 
  devise_for :users

  # いいね機能ルーティング
  post   '/like/:post_id' => 'likes#like',   as: 'like'
  delete '/like/:post_id' => 'likes#unlike', as: 'unlike'


  #タイマー機能用ルーティング
  get "timers/study" => "timers#study"
  get "timers/relax" => "timers#relax"
  get "timers/fitness" => "timers#fitness"
  get "timers/hobby" => "timers#hobby"
end
