require 'roo'
require 'spreadsheet'
require 'net/http'
require "rexml/document"

namespace :parser_excel do

  task parser_excel: :environment do
    begin
      #files = Dir.entries("public/excel/parser")
      #files.delete(".")
      #files.delete("..")
      #files.map do |file_name|
        #file = Roo::Spreadsheet.open("public/excel/parser/#{file_name}")

#
# xml_content = Net::HTTP.get(URI.parse('http://www.heureka.cz/direct/xml-export/shops/heureka-sekce.xml'))
# data = Hash.from_xml(xml_content)

        file = File.open("public/excel/parser/promua.xml", "r")
        doc = REXML::Document.new file
        hash = Hash.from_xml(file)
        categories = {}
        doc.elements.each("yml_catalog/shop/categories/category") do |category|
          mod_cat = { "#{category.text.gsub("\n", '')}": {id: category.attributes["id"], parentId: category.attributes["parentId"]}}
          categories.merge!(mod_cat)
        end
        byebug
        doc.elements.each("yml_catalog/shop/offers/offer") do |offer|
          item = Item.new
          offer.map do |el|
             next if el == "\n"
             if el.name == "param"
               if el.attributes["name"] == "Размеры в наличии"
                 item["size"].push(el.text)
               elsif el.attributes["name"] == "Сезон"
                 item["season"] = el.text
               elsif el.attributes["name"] == "Цвет"
                 item["color"] = el.text
               elsif el.attributes["name"] == "Вид"
                 item["category"] = el.text
               elsif el.attributes["name"] == "Производитель"
                 item["brand"] = el.text
               elsif el.attributes["name"] == "Материал верха" || el.attributes["name"] == "Материал подкладки"  || el.attributes["name"] == "Полнота" || el.attributes["name"] == "Высота каблука" || el.attributes["name"] == "Вид подошвы"
                 item["composition"] += " " + el.attributes["name"] + " " + el.text
               end
             elsif el.name == "name"
               item["name"] = el.text
             elsif el.name == "url"
               item["article"] = el.text
             elsif el.name == "description"
               item["description"] = el.text
             elsif el.name == "picture"
               item["picture"].push(el.text)
             elsif el.name == "picture"
               item["picture"].push(el.text)
             elsif el.name == "price"
               item["drop_ship_price"] = el.text
               item["price"] = CalcClientPrice.calc_client_price(el.text)
             end
          end
        end

        # drop_ship_name = file_name.split("_")[0]
        # artwork = ActionDispatch::Http::UploadedFile.new(
        #   filename: file_name,
        #   content_type: "application/vnd.ms-excel",
        #   tempfile: file,
        # )
        # @items_import = ItemsImport.new({:file => artwork}, drop_ship_name)
        # if @items_import.save
        #   Item.update_size_same_items
        #   Item.delete_bad_products
        #   Item.create_header
        #   FilterOption.delete_all
        #   FilterOption.create!(Item.generate_filters(Item.all))
        # end
      #end
    rescue Zip::Error

      Roo::Spreadsheet.open(filepath)
    end
  end

end
