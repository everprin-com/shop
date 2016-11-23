#require "receipts/version"
#require "receipts/receipt"

class ProductsController < ApplicationController
  
  include CurrentCart
  before_action :set_cart
  before_action :authenticate_user!, :except => [:show, :index]
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :ban_path, only: [:show]

  respond_to :html, :js, :json
 
  # GET /products
  # GET /products.json
  def index
    @products = Product.all
  end

  # GET /products/1
  # GET /products/1.json
  def show
    @user=User.find(@product.user_id)
    @info=@user.info
     respond_to do |format|
      format.html
      format.pdf {send_data @product.receipt.render, filename: "#{@product.title}-receipt.pdf", type: "application/pdf", disposition: :attachment}
      format.js
    end
  end
  
  # GET /products/new
  def new
    @product = Product.new
    respond_modal_with @product
  end

  # GET /products/1/edit
  def edit
    respond_modal_with @product
  end

  # POST /products
  # POST /products.json
  def create
    @product = current_user.products.build(product_params)
    @product.update_attributes(title: save_title(@product.title))
    respond_to do |format|
      if @product.save
        format.html { redirect_to store_index_path, notice: 'Product was successfully created.' }
        format.json { render :index, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to store_index_path, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  def mobile
    @products = Product.where(category: "Mobile").paginate(:page => params[:page], :per_page => Configurable['products_per_page'])
    @product= @products.first
    render "store/index"
  end  

  def car
    @products = Product.where(category: "Car").paginate(:page => params[:page], :per_page => Configurable['products_per_page'])
    @product= @products.first
    render "store/index"
  end  
  
   def laptop
    @products = Product.where(category: "Laptop").paginate(:page => params[:page], :per_page => Configurable['products_per_page'])
    @product= @products.first
    render "store/index"
  end  

   def telephone
    @products = Product.where(category: "Mobile").paginate(:page => params[:page], :per_page => Configurable['products_per_page'])
    @product= @products.first
    render "store/index"
  end  
  

  private
    # Use callbacks to share common setup or constraints between actions.
  def set_product
    begin
      @product = Product.find(params[:id])
    rescue
      raise Cinema::NotFound 
    end
  end
   
      def scoped_products
      if current_role?(:author)
        Blog.for_role(current_role)
      else
        Blog.published.for_role(current_role)
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.require(:product).permit(:user_id, :category, :title, :full_description,:description, :uploaded_file, :price)
    end
end
