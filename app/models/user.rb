class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # UserモデルActiveHash
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :career
  belongs_to :gender
  # ジャンルの選択が「--」の時は保存できないようにする

  # Userモデルバリデーション制限
  with_options presence: true do
    validates :nickname
    validates :email, uniqueness: true,
                      format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+.)+[a-z]{2,})\z/i, message: 'に@を入力してください' }
    validates :password, length: { minimum: 6 }
    validates :career_id, :gender_id, numericality: { other_than: 1, message: 'を選択してください' }
  end

  # Userモデルアソシエーション
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
end
