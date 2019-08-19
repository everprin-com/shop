class ChandeWorldSizeItems < ActiveRecord::Migration
  def change
    change_column :items, :size_world, :json
  end
end
