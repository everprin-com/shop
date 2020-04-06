class CreateQuestionnaires < ActiveRecord::Migration[5.2]
  def change
    create_table :questionnaires do |t|
      t.string :reason
      t.string :slug_id
      t.string :category

      t.timestamps
    end
  end
end
