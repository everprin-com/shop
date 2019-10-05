class AddSlugToItems < ActiveRecord::Migration
  def change
    add_column :items, :slug_id, :string#, unique: true
    add_index :items, :slug_id#, unique: true
  end
end
