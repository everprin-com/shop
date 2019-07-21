class Item < ActiveRecord::Base
  DEFAULT_PAGE = 16
  #include ActiveModel::Serialization
  include PgSearch
  #pg_search_scope :search_name, against: [:name]
  pg_search_scope :search_color, against: [:color]
  pg_search_scope :search_category, against: [:category]
  pg_search_scope :search_brand, against: [:brand]

  GROUP = {
    clothes: [
      "Зимние женские куртки", "Женские плащи", "Одежда",
      "Туники", "Костюмы женские", "Женские спортивные костюмы",
      "Женские брюки", "Женские пиджаки", "Женские свитера",
      "Блузки и рубашки", "Леггинсы и лосины",
      "Женские кардиганы", "Женские шапки", "Сарафаны",
      "Женские капри и бриджи", "Платья",
      "Женские футболки и майки", "Жилетки", "Женские юбки"
    ],
    footwear: ["Обувь"],
    accessories: ["Сумки", "Аксессуары"]
  }

  def self.create_header
    Header.delete_all
    catalogues = Item.select(:category).uniq.map(&:category)
    catalogues.map do |catalogue|
      count = Item.where(category: catalogue).count
      group = GROUP.select{ |key, hash| hash.include?(catalogue.capitalize) }.keys[0].to_s
      Header.create!(count_items: count, catalogue: catalogue, group: group)
    end
  end

  def self.name_search(query)
    self.where("similarity(name, ?) > 0.1", query).order("similarity(name, #{ActiveRecord::Base.connection.quote(query)}) DESC")
  end
end
