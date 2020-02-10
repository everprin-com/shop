class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.string :name
      t.text :address
      t.string :email
      t.string :pay_type
      t.integer :total_price
      t.integer :total_price_drop_ship
      t.string :phone
      t.json :status, default: {}
      t.timestamps null: false
    end
  end
end
