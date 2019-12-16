class AverageVoted < ActiveRecord::Base

  def self.create_average_voted(item, comment_count)
    average_mark = rand(3.8..5)
    # p comment_count
    # byebug
    datas = { count_voted: comment_count, slug_id: item.slug_id, average_mark: average_mark, sum_voted: comment_count * average_mark }
    AverageVoted.create!(datas)
  end
end
