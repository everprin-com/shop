class ChangeMaleToSexArrayItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :sex, :string, array: true, default: '{}'
  end
end
