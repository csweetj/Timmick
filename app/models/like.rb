class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post

  # いいね重複防止バリデーション
  validates :post_id, uniqueness: { scope: :user_id }
end
