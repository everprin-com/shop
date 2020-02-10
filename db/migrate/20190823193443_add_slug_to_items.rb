class AddSlugToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :slug_id, :string#, unique: true
    add_index :items, :slug_id#, unique: true
  end
end
