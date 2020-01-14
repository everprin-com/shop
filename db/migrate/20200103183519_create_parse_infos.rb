class CreateParseInfos < ActiveRecord::Migration
  def change
    create_table :parse_infos do |t|
      t.string :description
      t.string :category
      t.string :composition
      t.string :slug_id
      t.string :sex, array: true, default: '{}'
      t.timestamps null: false
    end
  end
end
