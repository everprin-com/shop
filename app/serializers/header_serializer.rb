class HeaderSerializer < ActiveModel::Serializer
  attributes :id, :count_items, :catalogue, :group, :male

  root false

  def catalogue
    return unless object.catalogue
    eval(object.catalogue)
  end
end
