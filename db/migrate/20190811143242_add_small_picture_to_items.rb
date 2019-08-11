class AddSmallPictureToItems < ActiveRecord::Migration
  def change
    add_column :items, :small_picture, :string, array: true, default: '{}'
  end
end
