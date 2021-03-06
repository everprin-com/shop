class CreateProductComments < ActiveRecord::Migration[5.2]
  def change
    create_table :product_comments do |t|
      t.string :from_ip
      t.string :category, null: false
      t.string :date, null: false
      t.string :author, null: false
      t.string :name_product
      t.string :client_info
      t.string :text, null: false
      t.string :slug_id, null: false
      t.timestamps null: false
    end
  end
end
