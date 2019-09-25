require 'roo'
require 'spreadsheet'
require 'net/http'
require "rexml/document"

namespace :parser_xml do
  task parser_xml: :environment do
    begin
      file = File.open("public/excel/parser_xml/promua.xml", "r")
      doc = REXML::Document.new file
      hash = Hash.from_xml(file)
      categories = {}
      doc.elements.each("yml_catalog/shop/categories/category") do |category|
        mod_cat = { "#{category.text.gsub("\n", '')}": {id: category.attributes["id"], parentId: category.attributes["parentId"]}}
        categories.merge!(mod_cat)
      end

      doc.elements.each_with_index("yml_catalog/shop/offers/offer") do |offer, index|
        item = Item.new
        p index
        offer.map do |el|
           next if el == "\n"
           if el.name == "param"
             if el.attributes["name"] == "Размеры в наличии"
               item["size"].push(el.text)
             elsif el.attributes["name"] == "Сезон"
               item["season"] = el.text
             elsif el.attributes["name"] == "Цвет"
               el.text&.split(", ")&.flatten do |color|
                 item["color"].push(color)
               end
             elsif el.attributes["name"] == "Вид"
               item["category"] = el.text
             elsif el.attributes["name"] == "Производитель"
               item["brand"] = el.text
             elsif el.attributes["name"] == "Материал верха" || el.attributes["name"] == "Материал подкладки"  || el.attributes["name"] == "Полнота" || el.attributes["name"] == "Высота каблука" || el.attributes["name"] == "Вид подошвы"
               #item["composition"] += " " + el&.attributes["name"] + " " + el&.text
               item["composition"] ||= ""
               item["composition"] += " " + el&.attributes["name"] + " " + el&.text
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
           item["sex"] = ["wooman"]
           item["drop_ship"] = "Villomi"
        end
        item.save
      end
      Item.update_size_same_items
      Item.delete_bad_products
      Item.create_header
      FilterOption.delete_all
      FilterOption.create!(Item.generate_filters(Item.all))
    rescue Zip::Error
      Roo::Spreadsheet.open(filepath)
    end
  end

end
