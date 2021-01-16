class Relationship < ApplicationRecord
      #フォローワーのユーザー
      belongs_to :follower, class_name: "User"
      #フォロー中ユーザー
      belongs_to :following, class_name: "User"
      #バリデーション
      validates :follower_id, presence: true
      validates :following_id, presence: true
  
end
