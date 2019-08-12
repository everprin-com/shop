class HeaderSerializer < ActiveModel::Serializer
  attributes :id, :count_items, :catalogue, :group, :male

  root false

end
