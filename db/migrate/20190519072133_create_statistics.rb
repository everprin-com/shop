class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.string :ip
      t.references :order, index: true
      t.timestamps null: false
    end
  end
end
