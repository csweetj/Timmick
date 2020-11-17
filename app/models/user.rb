class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :career
  belongs_to :gender
  #ジャンルの選択が「--」の時は保存できないようにする
  validates :career_id, numericality: { other_than: 1 }
  validates :gender_id, numericality: { other_than: 1 }
  
  has_many :posts
end
