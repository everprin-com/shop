class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :article, null: false
      t.string :name, null: false
      t.string :description
      t.integer :price, null: false
      t.string :color
      t.string :picture, null: false
      t.string :brand
      t.string :season
      t.string :male
      t.string :size
      t.string :country
      t.string :category
      t.string :presence, default: true
      t.string :size_world
      t.string :drop_ship
      t.string :composition
      t.timestamps null: false
    end
    #enable_extension "pg_trgm"
  end
end
