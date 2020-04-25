class ProductCommentsController < ApplicationController

  def create
    if ProductComment.valid?(comment_params)
      product_comment = ProductComment.create(comment_params)
      Voted.create(product_comment_id: product_comment.id, slug_id: params[:slug_id], mark: params[:rate] || 5)
      AverageVoted.update_average_voted(params[:slug_id], params[:rate])
      render json: { respond: "saved" }
    else
      render json: { respond: "Not saved" }
    end
  end

  private

  def comment_params
    params.permit(:slug_id, :category, :date, :author, :text)
  end

end
