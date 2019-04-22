class Item < ActiveRecord::Base

    include PgSearch
    pg_search_scope :search, against: [:name]
    
end
