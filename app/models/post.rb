class Post < ApplicationRecord
  with_options presence: true do
    validates :title, :body
  end

  belongs_to :user
  has_many_attached :feature_images
end
