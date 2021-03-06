class VzutoParser
  attr_accessor :xml_file
  CATEGORIES =  [
    "Балетки", "Угги", "Ботфорты",
    "Ботинки", "Туфли", "Сапоги", "Казаки",
    "Босоножки", "Лодочки", "Ботильоны",
    "Кроссовки", "Кеды", "Шлепанцы", "Эспадрильи",
    "Мокасины", "Мюли", "Слипоны", "Белетки",
    "Полусапожки", "Сапоги-трубы", "Сабо", "Хайтопы",
    "Спортивные костюмы", "Сникерсы", "Ботильены",
  ]

  def initialize(xml_file)
    #attributes.each { |name, value| send("#{name}=", value) }
    @xml_file = xml_file
  end

  def self.parse_xml_olla(offer, index, categories, used_drop)
    item = Item.new
    item["drop_ship"] = used_drop
    p index
    offer.map do |el|
      next if !offer["available"]
      case el.name
      when "param"
        case el.attributes["name"]
         when "Сезон"
           item["season"] = [el.text]
         when "Размер женской обуви"
           item["size"] = [el.text]
           item["sex"] = ["wooman"]
         when "Цвет"
           item["color"] = el.text&.split(", ")&[0]
         when "Вид обуви"
           item["category"] = NormalizerParse.set_category(el.text)
         when "Материал верха", "Материал подкладки", "Полнота", "Высота каблука", "Вид подошвы"
           item["composition"] ||= ""
           item["composition"] += " " + el&.attributes["name"].to_s + " " + el&.text.to_s
         end
       when "name"
         item["brand"] = "Vzuto"
         item["name"] = el.text.gsub(/\d+/, "")&.strip
         founded_category = el.text.gsub(',', " ").gsub('-', " ")&.split(" ")&.map(&:capitalize) + CATEGORIES.flatten.uniq
         founded_uniq_category = NormalizerParse.non_uniq(founded_category)
         item["category"] = NormalizerParse.set_category(founded_uniq_category[0]) if founded_uniq_category.present?
       when "vendorCode"
         item["article"] = el.text
       when "description"
         parsed_tex = el.text&.gsub('</p>', " ")&.gsub('<p>', " ")&.remove(":")&.split(" ")
         size_world_index = parsed_tex.index("сетка")
         length_parsed_tex = parsed_tex.length
         size = parsed_tex.index("Размеры")
         country_index = parsed_tex.index("Производитель")
         if country_index.present?
           item["country"] = parsed_tex[country_index+1]
        end
         next if !size.present?
         index_size = size + 1
         sizes =  parsed_tex[index_size].split("<")[0].split("_")[0]
         if sizes.split("-").length == 2 && sizes.include?("-")
           sizes = sizes + parsed_tex[index_size + 1]
           normalized_range_sizes = sizes[/\d+.\d+/]
         end
         item["size"] = conver_size_to_array(normalized_range_sizes) if !item["size"].present?
       when "categoryId"
         found_category = categories.values.select { |category| category[:id] == el.text }
         if found_category.present?
           parentId = found_category[0][:parentId]
         end
         categories.each do |key, value|
           if value[:id] == parentId
             item["sex"] =
              if Item::MAN_CATEGORIES.include?(key.to_s)
                ["man"]
              elsif Item::WOOMAN_CATEGORIES.include?(key.to_s)
                item["sex"] = ["wooman"]
              end
           end
         end
       when "picture"
         item["picture"].push(el.text)&.compact
       when "price"
         item["drop_ship_price"] = el.text
         item["price"] = CalcClientPrice.calc_client_price(el.text)
       end
    end
    if item["color"].present? && item["size"].present?
      item["slug_id"] = NormalizerParse.create_slug(item["name"], item["color"])
      item["category_translate"] = Translit.convert(item["category"], :english) if item["category"].present?
      NormalizerParse.capitalize_item(item)
      NormalizerParse.make_unvaliable_old_item(item)
      item.save if NormalizerParse.delete_null_item(item)
    end
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
