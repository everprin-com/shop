class ChangeDataTypeForItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.change :male, :boolean, default: false, null: true
    end
  end
  def self.down
    change_table :items do |t|
      t.change :male, :boolean, default: false, null: true
    end
  end
end
