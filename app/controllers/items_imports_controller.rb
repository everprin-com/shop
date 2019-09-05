
class ItemsImportsController < ApplicationController
  before_action :only_admin_or_moderator

  def new
    @items_import = ItemsImport.new
  end

  def create
    return unless params[:drop_ship_name].present?
    @items_import = ItemsImport.new(params[:items_import], params[:drop_ship_name])
    if @items_import.save
      Item.update_size_same_items
      Item.delete_bad_products
      Item.create_header
      redirect_to items_path
    else
      render :new
    end
  end
end
