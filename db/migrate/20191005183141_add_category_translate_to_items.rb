class AddCategoryTranslateToItems < ActiveRecord::Migration
  def change
    add_column :items, :category_translate, :string#, unique: true
    add_index :items, :category_translate#, unique: true
  end
end
