class AddPhoneToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :phone, :string
    add_column :orders, :status, :json, default: {}
  end
end
