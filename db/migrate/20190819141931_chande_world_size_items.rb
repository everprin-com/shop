class ChandeWorldSizeItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.change :size_world, :text
    end
  end
  def self.down
    change_table :items do |t|
      t.change :size_world, :string
    end
  end
end
