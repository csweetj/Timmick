class Timer < ApplicationRecord
  with_options presence: true do
    validates :count
  end
  
  belongs_to :user
  
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :genre
end
