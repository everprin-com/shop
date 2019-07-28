class AddDepartmentToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :departament, :string, null: false
  end
end
