class ProductComment < ActiveRecord::Base
  NECESSARY_VALUES = [ "slug_id", "category", "date", "author", "text" ]
  has_one :voted#, foreign_key: "slug_id"#, primary_key: "slug_id"
  #DEFAULT_MARK = 4

  def self.valid?(comment)
    comment_keys = comment.keys
    NECESSARY_VALUES.all? { |key| comment_keys.include?(key) }
  end

  def self.crete_comments(max_comments, items, value, key)
    sum_randoms = 0
    items.each do |item|
      random_comments_count = rand(0..max_comments)
      used_comments = value["comments"][sum_randoms, random_comments_count]
      next unless used_comments.present?
      used_comments.each do |comment|
        product_comment = ProductComment.create(comment.merge!(id: nil, category: key.to_s, slug_id: item.slug_id))
        Voted.create(product_comment_id: product_comment.id, slug_id: item.slug_id, mark: comment["rate"] || 5)
        AverageVoted.update_average_voted(item.slug_id, comment["rate"])
      end
      sum_randoms += random_comments_count
   end
 end

end
