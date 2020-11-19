class Post < ApplicationRecord
  
  with_options presence: true do
    validates :title, :body
  end

  belongs_to :user
  has_one_attached :image
end
