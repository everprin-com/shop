
module Admins
  class Admin < ActiveRecord::Base
      
      # "https://favoritti.com/upload/favoritti_com_export_csv_opt.xlsx",
      XLS_LINK = [
        "http://timeofstyle.com/download/tos_actual_price_and_stock.xls",
        "https://ager.ua/download/ager_actual_price_and_stock.xls",
        "https://garne.com.ua/files/prices_clothes.xlsx",
        
      ]

      XML_LINK = [
        "https://issaplus.com/load/xml.php",
        "http://tm-modus.com/user/xml_client.php?user=51849",
        "https://www.vm-villomi.ua/promua.xml",
        #{}"https://olla.ua/export/dropshipping.xml",
        #{}"https://vzuto.crm-onebox.com/media/export/2.xml",
      ]
  end
end
