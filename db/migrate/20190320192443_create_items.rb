class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :article, null: false
      t.string :name, null: false
      t.string :description
      t.decimal :price, precision: 8, scale: 2#, null false
      t.string :color
      t.string :picture, array: true, default: '{}', null: false
      t.string :brand
      t.integer :season
      t.boolean :male, default: false, null: false
      t.string :size, array: true, default: '{}'
      t.string :country
      t.string :category
      t.string :presence, default: true#change name
      t.string :size_world
      t.string :drop_ship, null: false
      t.string :composition
      t.decimal :drop_ship_price, precision: 8, scale: 2#, null false
      t.timestamps null: false
    end
    add_index  :items, :size, using: 'gin'
    #enable_extension "pg_trgm"
  end
end
