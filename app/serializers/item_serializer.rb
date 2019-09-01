class ItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :article, :name, :description, :color, :picture, :brand, :sex, :small_picture,
  :season, :male, :size, :country, :category, :available_product, :size_world, :composition

  root false

  def size_world
    return unless object.size_world
    if object.drop_ship == "Timeforstyle"
      object.size_world
    else
      eval(object.size_world)
    end
  end
end
