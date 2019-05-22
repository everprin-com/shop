class OrdersController < ApplicationController
  include ControllerRails
  include CurrentCart
  before_action :only_admin_or_moderator, only: :update
  #before_action :set_cart
  #respond_to :html, :js, :json

  def set_model
    @model = Order
  end

  def show
    description_of_buyes(@resource)
  end

  def create
    order = Order.new(resource_params)
    if order.save!
      order.create_statistic!(ip: request.remote_ip)
      TeleNotify::TelegramUser.find_by_tg_channel("order").send_message(order.to_json)
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end

    # @cart.line_items.each do |line_item|
    #   @order.line_items << line_item
    # end
    # @order.total_price = all_total_price
    # respond_to do |format|
    #   if @order.save
    #     session[:cart_id] = nil
    #     format.html { redirect_to @order, notice: 'Order was successfully created.' }
    #     format.json { render :show, status: :created, location: @order }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @order.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def update
    order = Order.find(params[:id])
    order.update!(status: params[:order][:status])
    redirect_to "/admin/admins"
  end

  private

  def description_of_buyes(order)
    order.line_items.each do |line_item|
      @product = Product.find(line_item.product_id)
      @product_title = @product.title
      @quantity = line_item.quantity
      @price = line_item.price
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def resource_params
    params.require(:order).permit(:name, :address, :phone, :status)
  end
end
