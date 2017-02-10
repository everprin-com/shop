class StoreController < ApplicationController
  
  respond_to :html, :json

  def all_category
  	@products = Product.order(:title)
  end

  def index
    @product=Product.first
    #@products = Product.order(:title)
  	@products = Product.order(:title).paginate(
       :page => params[:page],
       :per_page => Configurable[:products_per_page]
    )
    @resourse='Product'
  end

  def show
    respond_modal_with @cart
  end 

  def showlike
    respond_modal_with @cart
  end
  

  def contact
    @messagestoadministrator = Messagestoadministrator.new
  end 
   
end
