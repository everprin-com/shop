module Admins
  class Admin < ActiveRecord::Base

      XLS_LINK = [
        "http://timeofstyle.com/download/tos_actual_price_and_stock.xls",
        "https://ager.ua/download/ager_actual_price_and_stock.xls",
<<<<<<< HEAD:app/models/admin/admin.rb
        "https://issaplus.com/load/csv3.php",
        "https://arjen.com.ua/prices/xml.php",
        "https://www.vm-villomi.ua/promua.xml",
      ]
      XML_LINK = [
        "https://www.vm-villomi.ua/promua.xml",
=======
        "https://garne.com.ua/files/garne_prices_clothes.xlsx",
        "https://favoritti.com/upload/favoritti_com_export_csv_opt.xlsx",
>>>>>>> master:app/models/admins/admin.rb
      ]
  end
end
