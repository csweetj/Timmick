class Post < ApplicationRecord
  # ポストモデルバリデーション制限
  with_options presence: true do
    validates :title, :body
  end

  # ポストモデルアソシエーション
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many_attached :feature_images


end
