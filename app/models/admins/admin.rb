module Admins
  class Admin < ActiveRecord::Base

      XLS_LINK = [
        "http://timeofstyle.com/download/tos_actual_price_and_stock.xls",
        "https://ager.ua/download/ager_actual_price_and_stock.xls",
        "https://garne.com.ua/files/garne_prices_clothes.xlsx",
        "https://favoritti.com/upload/favoritti_com_export_csv_opt.xlsx",
      ]
  end
end
