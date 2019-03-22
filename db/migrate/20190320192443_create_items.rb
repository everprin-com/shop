class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :code
      t.string :name
      t.string :article
      t.string :strih_code
      t.string :goods
      t.string :brand
      t.timestamps null: false
    end
  end
end
