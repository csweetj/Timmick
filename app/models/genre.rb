class Genre < ActiveHash::Base
  self.data = [
    { id: 1, name: 'ポモドーロ学習' },
    { id: 2, name: '学生学習' },
    { id: 3, name: 'ボックス呼吸' },
    { id: 4, name: 'レムサイクル仮眠' },
    { id: 5, name: 'HIITトレーニング' },
    { id: 6, name: 'ストレッチ・ヨガ' },
    { id: 7, name: 'ゲーム' },
    { id: 8, name: '趣味' }
  ]

  include ActiveHash::Associations
  has_many :timers
  end
