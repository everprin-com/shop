class ProductCommentsController < ApplicationController

  def create
    #byebug
     params = { comment:
      {
        author: "vasa",
        client_info: 952499556,
        date: "19.12.2019",
        category: "Юбки",
        rate: 5,
        slug_id: "jubka_foot_korichnewyj",
        text: "yuiyuyuy",
      },
     }
    if ProductComment.valid?(params[:comment])
      byebug
      comment = params[:comment]
      ProductComment.create(
        author:  comment[:author], date: comment[:date],
        category: comment[:category], slug_id: comment[:slug_id],
        text: comment[:text]
      )
      average_voted = AverageVoted.find_by_slug_id(comment[:slug_id])
      Voted.create(slug_id: comment[:slug_id], mark: comment[:rate])
      if average_voted
        count_voted = average_voted.count_voted + 1
        sum_voted = average_voted.sum_voted + comment[:rate]
        average = sum_voted / count_voted
        average_voted.update(count_voted: count_voted, sum_voted: sum_voted, average_mark: average)
      else
        AverageVoted.create(count_voted: 1, sum_voted: comment[:rate], average_mark: comment[:rate])
      end
      render json: { respond: "saved" }
    else
      render json: { respond: "Not saved" }
    end
  end

  private
  # def comment_params
  #   params.require(:comment).permit(:slug_id, :category, :date, :author, :text)
  # end

end
