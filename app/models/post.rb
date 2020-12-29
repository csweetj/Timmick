class Post < ApplicationRecord
  # Postモデルバリデーション制限
  with_options presence: true do
    validates :title, :body
  end

  # Postモデルアソシエーション
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many_attached :feature_images
end
