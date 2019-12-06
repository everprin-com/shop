class CreateVoteds < ActiveRecord::Migration
  def change
    create_table :voteds do |t|
      t.integer :mark, null: false #mark 1..5
      t.integer :voter_id #user_id
      t.string :slug_id, null: false #slug_id
      t.timestamps null: false
    end
  end
end
