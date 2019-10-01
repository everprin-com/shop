class ChangeSeasonToItems < ActiveRecord::Migration
  def change
    remove_column :items, :season
    add_column :items, :season, :string, array: true, default: '{}'
  end
end
