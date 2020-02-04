class AddCommentIdToVoted < ActiveRecord::Migration
  def change
    add_column :voteds, :product_comment_id, :integer
  end
end
