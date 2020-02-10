class AddSmallPictureToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :small_picture, :string, array: true, default: '{}'
  end
end
