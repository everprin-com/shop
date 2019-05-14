class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :article, null: false
      t.string :name, null: false
      t.string :description
      t.integer :price, null: false
      t.string :color
      t.string :picture, null: false
      t.string :brand
      t.integer :season
      t.boolean :male, default: false, null: false
      t.string :size, null: false
      t.string :country
      t.string :category
      t.string :presence, default: true
      t.string :size_world
      t.string :drop_ship, null: false
      t.string :composition
      t.timestamps null: false
    end
    #enable_extension "pg_trgm"
  end
end
