class ChangeSeasonTypeItems < ActiveRecord::Migration[5.2]
  def self.up
    change_table :items do |t|
      t.change :season, :string
    end
  end
  def self.down
    change_table :items do |t|
      t.change :season, :integer
    end
  end
end
