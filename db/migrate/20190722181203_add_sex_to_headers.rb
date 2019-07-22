class AddSexToHeaders < ActiveRecord::Migration
  def change
    add_column :headers, :male, :boolean, default: false
  end
end
