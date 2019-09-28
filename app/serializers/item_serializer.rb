class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :article, :name, :description, :color, :picture, :brand, :sex, :small_picture,
  :season, :male, :size, :country, :category, :available_product, :size_world, :composition, :drop_ship,
  :created_at

  root false

  def size_world
    object.size_world&.to_s
  end

  def size
    object.size&.sort
  end
  def name
    object.name&.split("_")&.join(" ")&.scan(/[^0-9]+/)&.join("")
  end
end
