class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :career
  belongs_to :gender
  # ジャンルの選択が「--」の時は保存できないようにする

  with_options presence: true do
    validates :nickname
    validates :email, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+.)+[a-z]{2,})\z/i, message: 'に@を入力してください' }
    validates :password, length: { minimum: 6 }
    validates :career_id, :gender_id, numericality: { other_than: 1, message: 'を選択してください' }
  end

  has_many :posts
end
