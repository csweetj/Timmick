class Post < ApplicationRecord
  # ポストモデルバリデーション制限
  with_options presence: true do
    validates :title, :body
  end

  # ポストモデルアソシエーション
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many_attached :feature_images
  
  def liked_by?(user_id)
    likes.find_by(user_id: user_id)
   end
end
