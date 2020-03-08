namespace :create_comments do

  task create_comments: :environment do
   comments = File.open("public/comments.json").read

  Voted.delete_all
  ProductComment.delete_all
  AverageVoted.delete_all

  va = 0
  #byebug

  comments.each do |key, values|
    #byebug
    sex =
      if key == :female
        "wooman"
      else
        "man"
      end
    total = 0
    values.each do |key, value|
      comments_count = value[:comments].length
      total += comments_count
      p "key"
      p key
      p comments_count
      items = Item.where('sex && ARRAY[?]::varchar[]', sex).where(category: key.to_s)
      next unless items.present?
      items_count = items.count
      comments_to_items = (comments_count/items_count.to_f).ceil
      p "comments_to_items"
      p comments_count
      case comments_to_items
      when 0..1
        ProductComment.crete_comments(3, items, value, key)
      when 1..2
        ProductComment.crete_comments(4, items, value, key)
      when 2..3
        ProductComment.crete_comments(5, items, value, key)
      when 3..4
        ProductComment.crete_comments(7, items, value, key)
      when 5..6
        ProductComment.crete_comments(9, items, value, key)
      when 6..7
        ProductComment.crete_comments(11, items, value, key)
      end
    end
    p total
  end
end

end
