
class ItemsController < ApplicationController

  def index
    @items = Item.all
    #byebug
    @items = @items.name_search(params[:name_search]) if params[:name_search].present?
    #@items = @items.search_name(params[:name_search]) if params[:name_search].present?
    @items = @items.where("price >= ?", params[:price_search_from]) if params[:price_search_from].present?
    @items = @items.where("price <= ?", params[:price_search_to]) if params[:price_search_to].present?
    @items = @items.search_color(params[:search_color]) if params[:search_color].present?
    @items = @items.search_color(params[:search_brand]) if params[:search_brand].present?
    @items = @items.search_category(params[:search_category]) if params[:search_category].present?
    #@items = @items.paginate(page: 1, per_page: 20)
    respond_to do |format|
      format.html
      format.xml { render :xml => @people.to_xml }
    end
  end
end
