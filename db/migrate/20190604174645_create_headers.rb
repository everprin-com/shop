class CreateHeaders < ActiveRecord::Migration
  def change
    create_table :headers do |t|
      t.integer :count_items
      t.string :catalogue
      t.string :group

      t.timestamps null: false
    end
  end
end
