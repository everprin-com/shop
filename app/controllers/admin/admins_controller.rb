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
      Item.where(drop_ship: params[:drop_ship_name]).delete_all
      redirect "admin/admins"
    end
  end
end
