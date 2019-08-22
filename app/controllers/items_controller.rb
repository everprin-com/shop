
class ItemsController < ApplicationController

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
    items = items.where(category: params[:search_category]) if params[:search_category].present?
    #items = items.search_category(params[:search_category]) if params[:search_category].present?
    items = items.where('sex && ARRAY[?]::varchar[]', params[:sex]) if params[:sex].present?
    items = items.where(season: params[:season]) if params[:season].present?
    items = items.shuffle if params[:shuffled_products]
    items = items.paginate(page: params[:page], per_page: per_page(params[:per_page]))
    serialized_items = items.map { |item| ItemSerializer.new(item) }
    #render json: { items: items, total_pages: items.total_pages }
    render json: { total_pages: items.total_pages, filters_options: generate_filters, items: serialized_items }
  end

  def show
    item = Item.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: item.to_json }
    end
  end

   private

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

   def generate_filters(all_items, search_category)
     items = search_category.present? ? all_items.where(category: search_category) : all_items
     prices = items.map { |item| item.price}
     {
       size: items.map { |item| item.size}.flatten.uniq!,
       price_min: prices.min,
       price_max: prices.max,
       brand: items.map { |item| item.brand}.uniq!,
       season: items.map { |item| item.season}.uniq!,
       color: current_main_colors(items),
     }
   end

   def current_main_colors(items)
     all_colors = items.map { |item| item.color}.uniq
     uniq_colors = all_colors.map { |color| color.split("/") }.flatten.map(&:capitalize).uniq
     current_main_colors = []
     uniq_colors.each do |color|
       include_color = Item::COLOR_SHADES.select{|key, hash| hash.include?(color) }
       current_main_colors << (include_color.keys)[0].to_s if include_color.present?
     end
     current_main_colors.uniq
  end

   def per_page(per_page)
     per_page ? per_page : Item::DEFAULT_PAGE
   end
end
