class Item < ActiveRecord::Base

    include PgSearch
    pg_search_scope :search_name, against: [:name]
    pg_search_scope :search_color, against: [:color]
    pg_search_scope :search_category, against: [:category]
    pg_search_scope :search_brand, against: [:brand]
end
