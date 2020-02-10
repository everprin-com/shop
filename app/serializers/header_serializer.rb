class HeaderSerializer < ActiveModel::Serializer
  attributes :id, :count_items, :catalogue, :group, :male


  def catalogue
    return unless object.catalogue
    eval(object.catalogue)
  end
end
