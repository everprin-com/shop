class ChandeWorldSizeItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.change :items, :size_world, :json
    end
  end
  def self.down
    change_table :items do |t|
      t.change :items, :size_world, :string
    end
  end
end
