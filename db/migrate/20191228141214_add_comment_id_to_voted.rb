class AddCommentIdToVoted < ActiveRecord::Migration[5.2]
  def change
    add_column :voteds, :product_comment_id, :integer
  end
end
