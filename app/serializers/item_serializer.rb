class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :article, :name, :description, :color, :picture, :brand, :sex, :small_picture,
  :season, :male, :size, :country, :category, :available_product, :size_world, :composition, :drop_ship,
  :created_at, :slug_id, :category_translate, :product_comment_counts

  root false
  has_one :average_voted

  def size_world
    object.size_world&.to_s
  end

  # def group
  #   searched_key = ""
  #   Item::GROUP.map do |key, value|
  #     searched_key = key.to_s if value.include?(object.category)
  #   end
  #   searched_key
  # end

  def size
    object.size&.sort
  end

  def product_comment_counts
    object.product_comments.length
  end

  def name
    return if !object.name
    object.name.gsub(/ \d+.+(_|-| )/, " ")
    #object.name&.split("_")&.join(" ")&.scan(/[^0-9]+/)&.join("")
  end
end
