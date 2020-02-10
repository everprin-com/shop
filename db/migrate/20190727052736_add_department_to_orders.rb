class AddDepartmentToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :departament, :string, null: false
  end
end
