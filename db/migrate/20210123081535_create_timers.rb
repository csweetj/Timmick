class CreateTimers < ActiveRecord::Migration[6.0]
  def change
    create_table :timers do |t|
      t.integer :count, null: false
      t.references :user, null: false, foreign_key: true
      t.string :genre, null: false
      t.timestamps
    end
  end
end
