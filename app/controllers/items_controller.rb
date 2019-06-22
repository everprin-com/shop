
class ItemsController < ApplicationController

  def index
    items = Item.all
    items = items.name_search(params[:search_name]) if params[:search_name].present?
    items = items.where("price >= ?", params[:price_search_from]) if params[:price_search_from].present?
    items = items.where("price <= ?", params[:price_search_to]) if params[:price_search_to].present?
    items = items.where(color: params[:search_color]) if params[:search_color].present?
    items = items.where('size && ARRAY[?]::varchar[]', params[:search_size]) if params[:search_size].present?
    items = items.search_brand(params[:search_brand]) if params[:search_brand].present?
    items = items.where(category: params[:search_category]) if params[:search_category].present?
    #items = items.search_category(params[:search_category]) if params[:search_category].present?
    items = items.where(male: true) if params[:male].present?
    items = items.where(season: params[:season]) if params[:season].present?
    items = items.paginate(page: params[:page], per_page: per_page(params[:per_page]))
    serialized_items = items.map { |item| ItemSerializer.new(item) }
    #render json: { items: items, total_pages: items.total_pages }
    #byebug
    render json: { total_pages: items.total_pages, filters_options: generate_filters(items), items: serialized_items }
  end

  def show
    item = Item.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: item.to_json }
    end
  end

   private

   def generate_filters(items)
     prices = items.map{|item| item.price}
     {
       size: items.map{|item| item.size}.flatten.uniq!,
       price_min: prices.min,
       price_max: prices.max,
       brand: items.map{|item| item.brand}.uniq!,
       season: items.map{|item| item.season}.uniq!,
       color:  items.map{|item| item.color}.uniq!,
     }
   end

   def per_page(per_page)
     per_page ? per_page : Item::DEFAULT_PAGE
   end
end
