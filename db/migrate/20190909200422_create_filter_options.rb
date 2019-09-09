class CreateFilterOptions < ActiveRecord::Migration
  def change
    create_table :filter_options do |t|
      t.string :brand, array: true, default: '{}'
      t.string :color, array: true, default: '{}'
      t.string :price_max
      t.string :price_min
      t.string :season, array: true, default: '{}'
      t.string :size, array: true, default: '{}'
      t.timestamps null: false
    end
  end
end
