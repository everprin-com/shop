class ProductComment < ActiveRecord::Base
  NECESSARY_VALUES = [ "slug_id", "category", "date", "author", "text" ]

  def self.valid?(commment)
    comment_keys = commment.keys
    comment_keys.all? { |key| NECESSARY_VALUES.include?(key) }
  end

  def self.crete_comments(max_comments, items, value, key)
    sum_randoms = 0
    items.each do |item|
      random_comments_count = rand(0..max_comments)
      used_comments = value[:comments][sum_randoms, random_comments_count]
      next unless used_comments.present?
      used_comments.each do |comment|
        comment.merge!(id: nil, category: key.to_s, slug_id: item.slug_id)
      end
      AverageVoted.create_average_voted(item, random_comments_count)
      ProductComment.create(used_comments)
      sum_randoms += random_comments_count
   end
 end

end