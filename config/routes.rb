Rails.application.routes.draw do
  root to: 'posts#index'
  
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  resources :users, only: %i{show}, shallow: true do
    member do
      get :following, :followers
    end
  end
  # ゲストユーザー
  devise_scope :user do
    get 'users/guest_sign_in', to: 'users/sessions#guest_sign_in'
  end
  resources :relationships, only: %i[create destroy]

  
  resources :posts, shallow: true do
    resources :likes, only: %i[create destroy]
    resources :comments, only: %i[create destroy]
  end
  resources :tags, only: %i{index}

  # タイマー機能用ルーティング
  get 'timers/study' => 'timers#study'
  get 'timers/relax' => 'timers#relax'
  get 'timers/fitness' => 'timers#fitness'
  get 'timers/hobby' => 'timers#hobby'
  post 'timers/study' => 'timers#study_create'
  post 'timers/relax' => 'timers#relax_create'
  post 'timers/fitness' => 'timers#fitness_create'
  post 'timers/hobby' => 'timers#hobby_create'
end
