class Search < ActiveRecord::Base
   
  attr_accessor :title, :min_price, :max_price
  

   def search_products
    @products=Product.all
    @products=@products.where(["title LIKE ?", params[:search][:title].capitalize]).paginate(:page => params[:page], :per_page => Configurable['films_per_page']) if  params[:search][:title].present?
    @products=@products.where(["category LIKE ?", params[:search][:category].capitalize]).paginate(:page => params[:page], :per_page => Configurable['films_per_page']) if  params[:search][:category].present?
    @products=@products.where(["price >= LIKE ?", params[:search][:min_prace].capitalize]).paginate(:page => params[:page], :per_page => Configurable['films_per_page']) if  params[:search][:min_price].present?
    @products=@products.where(["price <= LIKE ?", params[:search][:max_prace].capitalize]).paginate(:page => params[:page], :per_page => Configurable['films_per_page']) if  params[:search][:max_price].present?

    return @products
  end
  
end
