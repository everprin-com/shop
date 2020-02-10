class CreateAnswerfrommoderators < ActiveRecord::Migration[5.2]
  def change
    create_table :answerfrommoderators do |t|
      t.integer :user_id
      t.boolean :send_message
      t.string :name
      t.string :content

      t.timestamps null: false
    end
  end
end
