
class ItemsController < ApplicationController

  caches_page :index, :generate_filters

  def index
    items = Item.all
    generate_filters = generate_filters(items, params[:search_category])
    items = items.name_search(params[:search_name]) if params[:search_name].present?
    items = items.group_search(params[:search_group]) if params[:search_group].present?
    items = search_by_price(items) if (params[:price_search] && JSON.parse(params[:price_search]).present?)
    # items = items.where("price >= ?", params[:price_search_from]) if params[:price_search_from].present?
    # items = items.where("price <= ?", params[:price_search_to]) if params[:price_search_to].present?
    items = items.search_color(shadow_collors(params[:search_color])) if params[:search_color].present?
    items = items.where('size && ARRAY[?]::varchar[]', params[:search_size]) if params[:search_size].present?
    items = items.where(brand: params[:search_brand]) if params[:search_brand].present?
    items = items.where(drop_ship: params[:drop_ship]) if params[:drop_ship].present?
    items = items.where(category: params[:search_category]) if params[:search_category].present?
    #items = items.search_category(params[:search_category]) if params[:search_category].present?
    items = items.where('sex && ARRAY[?]::varchar[]', params[:sex]) if params[:sex].present?
    items = items.where('season && ARRAY[?]::varchar[]', params[:season]) if params[:season].present?
    items = items.shuffle if params[:shuffled_products]
    items = items.paginate(page: params[:page], per_page: per_page(params[:per_page]))
    serialized_items = items.map { |item| ItemSerializer.new(item) }
    #render json: { items: items, total_pages: items.total_pages }
    render json: { total_pages: items.total_pages, filters_options: generate_filters, items: serialized_items }
  end

  def show
    item =
      if params[:slug_id]
        Item.find_by_slug_id(params[:slug_id])
      elsif params[:id]
        Item.find(params[:id])
      end
    respond_to do |format|
      format.html
      format.json { render json: ItemSerializer.new(item) }
    end
  end

   private

  def generate_filters(items, search_category)
     if search_category.present?
       Item.generate_filters(items, search_category)
     else
       FilterOption.first
     end
   end

   def search_by_price(items)
     #price_search= [{from: 450, to: 500}, {from: 800, to: 1000}]
     current_search_string = []
     JSON.parse(params[:price_search]).map do |price|
       current_search_string.push("where('price BETWEEN ? AND ?', #{price["from"]}, #{price["to"]})")
     end
     items.where(items.instance_eval(current_search_string.join(".")).where_values.join(" OR "))
   end

   def shadow_collors(main_colors)
     collors_shades = []
     main_colors.map do |main_color|
       collors_shades.push(Item::COLOR_SHADES[main_color.to_sym])
     end
     collors_shades.uniq
   end

   def per_page(per_page)
     per_page ? per_page : Item::DEFAULT_PAGE
   end
end
