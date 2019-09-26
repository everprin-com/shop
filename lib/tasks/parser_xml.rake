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
      drop_shipper = doc.elements.each("yml_catalog/shop/name") {|name| name}[0][0]
      Item.where(drop_ship: drop_shipper.to_s).delete_all
      doc.elements.each("yml_catalog/shop/categories/category") do |category|
        mod_cat = { "#{category.text.gsub("\n", '')}": {id: category.attributes["id"], parentId: category.attributes["parentId"]}}
        categories.merge!(mod_cat)
      end
      doc.elements.each_with_index("yml_catalog/shop/offers/offer") do |offer, index|
        item = Item.new
        p index
        offer.map do |el|
          next if el == "\n"
          case el.name
          when "param"
            case el.attributes["name"]
            when "Размеры в наличии"
              item["size"].push(el.text)
             when "Сезон"
               item["season"] = el.text
             when "Цвет"
               item["color"] = el.text&.split(", ")[0]
             when "Вид"
               item["category"] = NormalizerParse.set_category(el.text)
               if item["category"] == "Разное"
                 item["sex"] = ["man", "wooman"]
               elsif item["category"] == "Рюкзак" || item["category"] == "Сумки" || item["category"] == "Кошелек"
                  item["sex"] = ["man"]
               end
             when "Производитель"
               item["brand"] = el.text
             when  ["Материал верха", "Материал подкладки", "Полнота", "Высота каблука", "Вид подошвы" ]
               item["composition"] ||= ""
               item["composition"] += " " + el&.attributes["name"] + " " + el&.text
             end
           when "name"
             item["name"] = el.text
           when "url"
             item["article"] = el.text
           when "description"
             item["description"] = el.text
           when "categoryId"
             found_category = categories.values.select { |category| category[:id] == el.text }
             if found_category.present?
               parentId = found_category[0][:parentId]
             else
               next
             end
             categories.each do |key, value|
               if value[:id] == parentId
                 item["sex"] =
                   #if Item::WOOMAN_CATEGORIES.include?(key.to_s)
                     #["wooman"]
                   if Item::MAN_CATEGORIES.include?(key.to_s)
                     ["man"]
                   else
                     item["sex"] = ["wooman"]
                   end
               end

             end
           when "picture"
             item["picture"].push(el.text)
           when "price"
             item["drop_ship_price"] = el.text
             item["price"] = CalcClientPrice.calc_client_price(el.text)
           end
           item["drop_ship"] = drop_shipper
        end
        NormalizerParse.capitalize_item(item)
        item.save if NormalizerParse.delete_null_item(item)
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
