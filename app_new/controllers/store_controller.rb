class StoreController < ApplicationController
  
  respond_to :html, :json

  def all_category
  	@products = Product.order(:title)
  end

  def index
    @first_product=Product.first
    #@products = Product.order(:title)
  	@resources = Product.order_paginate(params[:page],Configurable[:products_per_page])
    #@resourse='Product'
  end

  def show
    respond_modal_with @cart
  end 

  def showlike
    respond_modal_with @cart
  end
  

  def contact
    @resource = Messagestoadministrator.new
  end 
   
end
