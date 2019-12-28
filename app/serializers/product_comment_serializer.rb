class ProductCommentSerializer < ActiveModel::Serializer
  attributes :id, :category, :date, :author, :text, :slug_id#, :voted
  has_one :voted
  root false

end
