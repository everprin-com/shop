
class ItemsController < ApplicationController

  def index
    if params[:name_search].present?
      @items = Item.search(params[:name_search])
    else
      @items = Item.all
    end

    respond_to do |format|
      format.html
      format.json { render json: @items }
    end
  end
end
