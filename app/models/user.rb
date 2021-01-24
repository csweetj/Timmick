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
  has_one_attached :avatar
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :timers, dependent: :destroy
  # フォローアソシエーション
  has_many :following_relationships, foreign_key: "follower_id", class_name: "Relationship",  dependent: :destroy
  has_many :following, through: :following_relationships
  has_many :follower_relationships, foreign_key: "following_id", class_name: "Relationship", dependent: :destroy
  has_many :followers, through: :follower_relationships

  #フォローしているかを確認するメソッド
  def following?(user)
    following_relationships.find_by(following_id: user.id)
  end

  #フォローするときのメソッド
  def follow(user)
    following_relationships.create(following_id: user.id)
  end

  #フォローを外すときのメソッド
  def unfollow(user)
    following_relationships.find_by(following_id: user.id).destroy
  end  
end
