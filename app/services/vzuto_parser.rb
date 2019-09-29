class VzutoParser
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
         when "Сезон"
           item["season"] = el.text
         when "Размер женской обуви"
           item["size"] = [el.text]
         when "Цвет"
           item["color"] = el.text&.split(", ")[0]
         when "Вид обуви"
           item["category"] = NormalizerParse.set_category(el.text)
           if item["category"] == "Разное"
             item["sex"] = ["man", "wooman"]
           elsif item["category"] == "Рюкзак" || item["category"] == "Сумки" || item["category"] == "Кошелек"
              item["sex"] = ["man"]
           end
         when "Производитель"
           item["brand"] = el.text
         when "Материал верха", "Материал подкладки", "Полнота", "Высота каблука", "Вид подошвы"
           item["composition"] ||= ""
           item["composition"] += " " + el&.attributes["name"] + " " + el&.text
         end
       when "name"
         item["name"] = el.text.scan(/[^0-9]+/)[0]
       when "vendorCode"
         item["article"] = el.text
       when "url"
         item["article"] = el.text
       when "description"
         item["description"] = el.text
         parsed_tex = el.text.split(" ")
         size = parsed_tex.index("Размеры:")
         next if !size.present? || size == 0 || item["size"].present?
         index_size = size + 1
         #byebug if item["name"] == "Черные мужские туфли на шнурках с перфорацией 45"
         sizes =  parsed_tex[index_size].split("<")[0].split("_")[0]
         #byebug if item["name"] == "Черные мужские туфли на шнурках с перфорацией 45"
         if sizes.split("-").length == 1 && sizes.include?("-")
           sizes = sizes + parsed_tex[index_size + 1]
         end
         item["size"] = conver_size_to_array(sizes)
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
              if Item::MAN_CATEGORIES.include?(key.to_s)
                ["man"]
              elsif Item::MAN_CATEGORIES.include?(key.to_s)
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
    NormalizerParse.capitalize_item(item)
    item.save if NormalizerParse.delete_null_item(item)
  end

  def self.conver_size_to_array(size)
    return [] unless size
    converted_size = size.is_a?(Float) ? [size.round.to_s] : size.to_s.split(",")&.flatten
    converted_size =
      converted_size&.flatten.map do |size|
        size.split("/")
      end
    # make from "34-36" => ["34", "35", "36"]
    converted_size =
      converted_size&.flatten.map do |size|
        if size.include?("-") && size.size > 1 &&  size.length > 1 && size.split("-")[0].to_i != 0 # one "-" && prevent "S-M"
          #next if !size.split("-")[1].present?
          (size.split("-")[0]..size.split("-")[1])&.to_a
        else
          size
        end
      end
    converted_size&.flatten&.uniq
  end
end
