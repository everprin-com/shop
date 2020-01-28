class ModusParser
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
      next unless el.to_s.present?
      case el.name
      when "url"
        item["article"] = el.text
      when "param"
        case el.attributes["name"]
        when "Размер"
          item["size"] = NormalizerParse.conver_size_to_array(el.text) #if !item["size"].present?
          #item["size"].push(el.text)
        when "Цвет"
          item["color"] = el.text
        when "Основной материал", "Отделочный материал"
          item["composition"] ||= ""
          item["composition"] += " " + el&.attributes["name"].to_s + " " + el&.text.to_s
        when "Длина по спинке", "Длина рукава"
          item["size_world"] ||= ""
          item["size_world"] += " " + el&.text
        end
       when "model"
         item["name"] = el.text
       when "description"
         without_html_tags = ActionView::Base.full_sanitizer.sanitize(el.text)
         item["description"] = CGI::unescapeHTML(without_html_tags).gsub!(/&nbsp/i, "")
       when "categoryId"
         found_category = categories.values.select { |category| category[:id] == el.text }
         if found_category.present?
            parsed_category = found_category[0]
            founded_category = categories.select{|key, hash| hash[:id] == parsed_category[:id] }
              # if Item::MAN_CATEGORIES.include?(parsed_sex)
              #   ["man"]
              # elsif Item::WOOMAN_CATEGORIES.include?(parsed_sex)
              #   ["wooman"]
              # end
            category = founded_category&.keys[0]&.to_s&.split(",")[0]
            modified_category =
              if category == "Верхняя женская одежда"
                "Шуба"
              else
                category
              end
            item["category"] = NormalizerParse.set_category(modified_category)
         end
       when "picture"
         item["picture"].push(el.text)
       when "price"
         item["drop_ship_price"] = el.text
         item["price"] = CalcClientPrice.calc_client_price(el.text)
       end
    end
    item["sex"] = ["wooman"]
    item["slug_id"] = NormalizerParse.create_slug(item["name"], item["color"])
    NormalizerParse.capitalize_item(item)
    item.save if NormalizerParse.delete_null_item(item)
  end
end
