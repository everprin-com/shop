
class ItemsController < ApplicationController

  def index
    if params[:query].present?
      @items = Item.search(params[:query])
    else
      @items = Item.all
    end
  end
end
