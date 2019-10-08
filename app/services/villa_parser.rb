class VillaParser
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
        when "Размеры в наличии"
           item["size"].push(el.text)
         when "Сезон"
           item["season"] = [el.text]
         when "Цвет"
           item["color"] = el.text&.split(", ")[0]
         when "Вид"
           item["category"] = NormalizerParse.set_category(el.text)
           if item["category"] == "Разное"
             item["sex"] = ["man", "wooman"]
           elsif item["category"] == "Рюкзак" || item["category"] == "Сумки" || item["category"] == "Кошельки"
             item["sex"] = NormalizerParse.get_sex_by_name(item["name"])
           end
         when "Производитель"
           item["brand"] = el.text
         when "Материал верха", "Материал подкладки", "Полнота", "Высота каблука", "Вид подошвы"
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
         next if  item["sex"].present?
         found_category = categories.values.select { |category| category[:id] == el.text }
         if found_category.present?
           parentId = found_category[0][:parentId]
         else
           next
         end
         categories.each do |key, value|
           if value[:id] == parentId
             item["sex"] =
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
    end
    item["slug_id"] = NormalizerParse.create_slug(item["name"], item["color"])
    item["category_translate"] = Translit.convert(item["category"], :english) if item["category"].present?
    NormalizerParse.capitalize_item(item)
    item.save if NormalizerParse.delete_null_item(item)
  end
end
