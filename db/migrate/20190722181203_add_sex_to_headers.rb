class AddSexToHeaders < ActiveRecord::Migration[5.2]
  def change
    add_column :headers, :male, :boolean, default: false
  end
end
