
class ItemsImportsController < ApplicationController
  #before_action :only_admin_or_moderator

  def new
    @items_import = ItemsImport.new
  end

  def create
    @items_import = ItemsImport.new(params[:items_import])
    if @items_import.save
      Item.update_size_same_items
      Item.create_header
      redirect_to items_path
    else
      render :new
    end
  end
end
