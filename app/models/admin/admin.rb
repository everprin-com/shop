module Admin
  class Admin < ActiveRecord::Base

      XLS_LINK = [
        "http://timeofstyle.com/download/tos_actual_price_and_stock.xls",
        "https://ager.ua/download/ager_actual_price_and_stock.xls",
        "https://issaplus.com/load/csv3.php",
        "https://arjen.com.ua/prices/xml.php",
        "https://www.vm-villomi.ua/promua.xml",
      ]
      XML_LINK = [
        "https://www.vm-villomi.ua/promua.xml",
      ]
  end
end
