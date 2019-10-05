class OllaParser
  attr_accessor :xml_file

  def initialize(xml_file)
    #attributes.each { |name, value| send("#{name}=", value) }
    @xml_file = xml_file
  end

  def self.parse_xml_olla(offer, index, categories, used_drop)
    item = Item.new
    item["drop_ship"] = used_drop
    p index
    offer.map do |el|
      next if el == "\n"
      case el.name
      when "param"
        case el.attributes["name"]
        when "Размер"
          item["size"].push(el.text)
        when "Производитель"
          item["brand"] = el.text
        end
       when "name"
         item["name"] = el.text
       when "url"
         item["article"] = el.text
       when "description"
         parsed_description = el.text.split(" ")
         index_color = parsed_description.index("Цвет:")
         if index_color.present?
           item["color"] =  parsed_description[index_color+1].split("<")[0]
         end
         item["description"] = el.text
         #!!!!!ADD SEASON
         #item["season"] = el.text
       when "categoryId"
         found_category = categories.values.select { |category| category[:id] == el.text }
         if found_category.present?
            parsed_category = found_category[0][:seo_h1].gsub(/[,]/, '')
            parsed_sex = parsed_category.split(" ")[0]
            item["sex"] =
              if Item::MAN_CATEGORIES.include?(parsed_sex)
                ["man"]
              elsif Item::WOOMAN_CATEGORIES.include?(parsed_sex)
                ["wooman"]
              end
            item["category"] = NormalizerParse.set_category(parsed_category.split(" ")[1])
         end
       when "picture"
         item["picture"].push(el.text)
       when "price"
         item["drop_ship_price"] = el.text
         item["price"] = CalcClientPrice.calc_client_price(el.text)
       end
    end
    NormalizerParse.capitalize_item(item)
    item.save if NormalizerParse.delete_null_item(item)
  end
end
