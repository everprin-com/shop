class StoreController < ApplicationController
  respond_to :html, :json, :xml

  def all_category
    @products = Product.order(:title)
  end

  def index
    #byebug
    #render :nothing => true, :status => 200, :content_type => 'text/html'
    #@first_product = Product.first
    # @products = Product.order(:title)
    #@resources = Product.order_paginate(params[:page], Configurable[:products_per_page])
    # @resourse='Product'
    if request.format.xml?
      #respond_to do |format|
      render file: './public/sitemaps/sitemap.xml'
    end
  end

  def show
    respond_modal_with @cart
  end

  def showlike
    respond_modal_with @cart
  end

  def sitemap
    #byebug
    respond_to do |format|
      format.xml { render file: 'public/sitemaps/sitemap.xml' }
      format.html { redirect_to root_url }
    end
  end

  def contact
    @resource = Messagestoadministrator.new
  end
end
