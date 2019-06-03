class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :article, :name, :description, :color, :picture, :brand,
  :season, :male, :size, :country, :category, :available_product, :size_world, :composition

  root false

end
