
class ItemsController < ApplicationController

  def index
    @items = Item.all
    @items = @items.name_search(params[:search_name]) if params[:search_name].present?
    @items = @items.where("price >= ?", params[:price_search_from]) if params[:price_search_from].present?
    @items = @items.where("price <= ?", params[:price_search_to]) if params[:price_search_to].present?
    @items = @items.where(color: params[:search_color]) if params[:search_color].present?
    @items = @items.where('size && ARRAY[?]::varchar[]', params[:search_size]) if params[:search_size].present?
    @items = @items.search_brand(params[:search_brand]) if params[:search_brand].present?
    @items = @items.where(category: params[:search_category]) if params[:search_category].present?
    #@items = @items.search_category(params[:search_category]) if params[:search_category].present?
    @items = @items.where(male: true) if params[:male].present?
    @items = @items.where(season: params[:season]) if params[:season].present?

    @items = @items.paginate(page: params[:page], per_page: 20)
    respond_to do |format|
      format.json { render json: { items: @items, total_pages:  @items.total_pages }}
      format.xml { render :xml => @people.to_xml }
    end
  end

  def show
    item = Item.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: item.to_json }
    end
  end

end
