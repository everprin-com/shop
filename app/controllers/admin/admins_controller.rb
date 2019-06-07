module Admin
  class AdminsController < Admin::BaseController
    before_action :authenticate_user!
    before_action :only_admin_or_moderator

    def index
      @infos = Info.all
      @users = User.all
      @orders = Order.order("created_at").includes(:statistic).all
    end

    def delete_drop_ship
      Item.where(drop_ship: params[:drop_ship_name].capitalize).delete_all
      Item.create_header
      redirect_to "admin/admins"
    end
  end
end
