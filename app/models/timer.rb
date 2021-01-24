class Timer < ApplicationRecord
  with_options presence: true do
    validates :timer_name, :timer_count
  end
  
  belongs_to :user
end
