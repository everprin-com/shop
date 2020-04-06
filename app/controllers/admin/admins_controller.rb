require 'rake'

Rake::Task.clear # necessary to avoid tasks being loaded several times in dev mode
Shop::Application.load_tasks # providing your application name is 'sample'

module Admin
  class AdminsController < Admin::BaseController
    before_action :authenticate_user!
    before_action :only_admin_or_moderator
    require 'open-uri'

    def index
      @infos = Info.all
      @users = User.all
      @orders = Order.order("created_at").includes(:statistic, :line_items).all
    end

    def show_test
      #system "bundle exec rspec spec/models/item_spec.rb --format html --out app/views/test_html/rspec_results.html"
      render file: "test_html/show_test.html"
    end

    def lounch_test
      system "RAILS_ENV=production bundle exec rspec spec/models/item_spec.rb --format html --out app/views/test_html/_rspec_results.html"
      #render file: "test_html/show_test.html"
      #render file: "test_html/rspec_results.html"
      redirect_to "/admin/admins/show_test"
    end

    def  convert_xls_to_db
      Parser::Convertor.convert_xls_to_db
      Rake::Task['sitemap:generate'].execute
      redirect_to "/admin/admins"
    end

    def convert_xml_to_db
      Parser::Convertor.convert_xml_to_db
      Rake::Task['sitemap:generate'].execute
      #{}%x[rake parser_xml:parser_xml]
      redirect_to "/admin/admins"
    end

    def upload_xml
      FileUtils.rm_rf('public/excel/parser_xml')
      FileUtils.mkdir_p('public/excel/parser_xml')
      Admins::Admin::XML_LINK.map do |link|
        download = open(link)
        IO.copy_stream(download, "public/excel/parser_xml/#{link.split('/')[-1]}")
      end
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
      FilterOption.delete_all
      FilterOption.create!(Item.generate_filters(Item.all))
      redirect_to "/admin/admins"
    end
  end
end
