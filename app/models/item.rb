class Item < ActiveRecord::Base
  DEFAULT_PAGE = 16
  include PgSearch
  #pg_search_scope :search_name, against: [:name]
  pg_search_scope :search_color, against: [:color]
  pg_search_scope :search_category, against: [:category]
  pg_search_scope :search_brand, against: [:brand]

  def self.name_search(query)
    self.where("similarity(name, ?) > 0.1", query).order("similarity(name, #{ActiveRecord::Base.connection.quote(query)}) DESC")
  end
end
