module Admin
  class AdminsController < Admin::BaseController
    before_action :authenticate_user!
    before_action :only_admin_or_moderator
    require 'open-uri'

    def index
      @infos = Info.all
      @users = User.all
      @orders = Order.order("created_at").includes(:statistic).all
    end

    def convert_xls
      %x[bundle exec rake parser_excel:parser_excel]
      redirect_to "/admin/admins"
    end

    def upload_xls
      FileUtils.rm_rf('public/excel/parser')
      FileUtils.mkdir_p('public/excel/parser')
      Admins::Admin::XLS_LINK.map do |link|
        download = open(link)
        IO.copy_stream(download, "public/excel/parser/#{link.split('/')[-1]}")
      end
      redirect_to "/admin/admins"
    end

    def delete_drop_ship
      Item.where(drop_ship: params[:drop_ship_name].capitalize).delete_all
      Item.create_header
      redirect_to "admin/admins"
    end
  end
end
