class CreateAverageVoteds < ActiveRecord::Migration
  def change
    create_table :average_voteds do |t|
      t.float :average_mark, null: false, default: 0 #mark 1..5
      t.integer :sum_voted, null: false, default: 0  #sum voted
      t.integer :count_voted, default: 0  #count_voted
      t.string :slug_id, null: false #slud_id
      t.timestamps null: false
    end
  end
end
