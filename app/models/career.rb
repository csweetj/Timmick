class Career < ActiveHash::Base
  self.data = [
    { id: 1, name: '--' },
    { id: 2, name: '営業' },
    { id: 3, name: '事務・管理' },
    { id: 4, name: '企画・マーケティング・経営・管理職' },
    { id: 5, name: 'サービス・販売・外食' },
    { id: 6, name: 'Web・インターネット・ゲーム' },
    { id: 7, name: 'クリエイティブ（メディア・アパレル・デザイン）' },
    { id: 8, name: '専門職（コンサルタント・士業・金融・不動産）' },
    { id: 9, name: 'ITエンジニア（システム開発・SE・インフラ）' },
    { id: 10, name: 'エンジニア（機械・電気・電子・半導体・制御）' },
    { id: 11, name: '素材・化学・食品・医薬品技術職' },
    { id: 12, name: '建築・土木技術職' },
    { id: 13, name: '技能工・設備・交通・運輸' },
    { id: 14, name: '医療・福祉・介護' },
    { id: 15, name: '教育・保育・公務員・農林水産' },
    { id: 16, name: '学生' },
    { id: 17, name: 'その他' }
  ]

  include ActiveHash::Associations
  has_many :users
end
