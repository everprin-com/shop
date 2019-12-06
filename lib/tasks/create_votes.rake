namespace :create_votes do

  task create_votes: :environment do
    Item.all.each_with_index do |item, index|
      count_voted = rand(7..15)
      average_mark = rand(3.8..5)
      p index
      #byebug
      datas = { count_voted: count_voted, slug_id: item.slug_id, average_mark: average_mark, sum_voted: count_voted * average_mark }
      AverageVoted.create!(datas)
    end
  end

end
