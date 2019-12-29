class AverageVoted < ActiveRecord::Base

  def self.update_average_voted(slug_id, rate)
    average_voted = AverageVoted.find_or_create_by(slug_id: slug_id)
    new_count_voted = average_voted.count_voted + 1
    new_sum_voted = average_voted.sum_voted + rate.to_f
    new_average = new_sum_voted / new_count_voted
    average_voted.update(count_voted: new_count_voted, sum_voted: new_sum_voted, average_mark: new_average)
  end
end
