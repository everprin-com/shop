class AddCommentsToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :comment, :string
  end
end
