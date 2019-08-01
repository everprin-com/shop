class ChangeMaleToSexArrayItems < ActiveRecord::Migration
  def change
    add_column :items, :sex, :string, array: true, default: '{}'
  end
end
