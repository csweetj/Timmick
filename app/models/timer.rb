class Timer < ApplicationRecord
  with_options presence: true do
    validates :count, :genre
  end
  
  belongs_to :user
end
