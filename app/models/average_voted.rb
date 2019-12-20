class AverageVoted < ActiveRecord::Base

  def self.update_average_voted(slug_id, rate)
    average_voted = AverageVoted.find_or_create_by(slug_id: slug_id)
    count_voted = average_voted.count_voted + 1
    sum_voted = average_voted.sum_voted + rate.to_f
    average = sum_voted / count_voted
    average_voted.update(count_voted: count_voted, sum_voted: sum_voted, average_mark: average)
  end

  def self.create_average_voted(item, comment_count)
    average_mark = rand(3.8..5)
    # p comment_count
    # byebug
    datas = { count_voted: comment_count, slug_id: item.slug_id, average_mark: average_mark, sum_voted: comment_count * average_mark }
    AverageVoted.create!(datas)
  end
end
