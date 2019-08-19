class ChandeWorldSizeItems < ActiveRecord::Migration
  def change
    change_column :items, :size_world, :json, 'json USING CAST(size_world AS json)'
  end
end
