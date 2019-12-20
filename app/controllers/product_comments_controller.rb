class ProductCommentsController < ApplicationController

  def create
    if ProductComment.valid?(comment_params)
      ProductComment.create(comment_params)
      Voted.create(slug_id: params[:slug_id], mark: params[:rate])
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
