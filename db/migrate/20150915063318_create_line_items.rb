class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.belongs_to :order, index: true, foreign_key: true
      t.integer :quantity, default: 1
      t.string :size, null: false
      t.integer :order_id, index: true
      t.string :article, null: false
      t.string :name, null: false
      t.decimal :price, precision: 8, scale: 2, null: false
      t.string :color
      t.string :category
      t.decimal :drop_ship_price, precision: 8, scale: 2, null: false
      t.string :drop_ship, null: false
      t.timestamps null: false
    end
  end
end
