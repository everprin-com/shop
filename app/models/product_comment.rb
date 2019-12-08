class ProductComment < ActiveRecord::Base

  def self.crete_comments(max_comments, items, value, key)
    sum_randoms = 0
    items.each do |item|
      random_kof = rand(0..max_comments)
      used_comments = value[:comments][sum_randoms, random_kof]
      next unless used_comments.present?
      used_comments.each do |comment|
        comment.merge!(id: nil, category: key.to_s, slug_id: item.slug_id)
      end
      ProductComment.create(used_comments)
      sum_randoms += random_kof
   end
 end

end
