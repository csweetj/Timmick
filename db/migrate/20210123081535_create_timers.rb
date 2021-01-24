class CreateTimers < ActiveRecord::Migration[6.0]
  def change
    create_table :timers do |t|
      t.string :timer_name, null: false
      t.integer :timer_count, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
