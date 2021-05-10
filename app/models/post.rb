class Post < ApplicationRecord
  # Postモデルバリデーション制限
  with_options presence: true do
    validates :title, length: { maximum: 30 }
    validates :body, length: { maximum: 140 }
  end

  validates :feature_images, content_type: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'], limit: { max: 4 }
  
  

  # Postモデルアソシエーション
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many_attached :feature_images, dependent: :destroy
  
  # タグ関連付け
  acts_as_taggable
end
