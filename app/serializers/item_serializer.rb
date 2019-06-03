class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :article, :name, :description, :color, :picture, :brand,
  :season, :male, :size, :country, :category, :presence, :size_world, :composition

  root false

  def presence
    "sdadas"
  end
end
