class IssaPlusParser
  attr_accessor :xml_file

  def initialize(xml_file)
    #attributes.each { |name, value| send("#{name}=", value) }
    @xml_file = xml_file
  end

  def self.parse_xml(offer, index, used_drop)
    item = Item.new
    item["drop_ship"] = used_drop
    p index
    offer.map do |el|
      next unless el.to_s.present?
      case el.name
      when "product_link"
        item["article"] = el.text
      when "sku"
        item["color"] = el.text.split("_")[1]
      when "product_sizes"
        item["size"] = el.map(&:text)
      when "product_name"
        item["name"] = el.text
      when "product_images"
        item["picture"] = el.map(&:text)
      when "product_prices"
        el.each do |el|
          if el.name == "uah"
            item["drop_ship_price"] = el.text
            item["price"] = CalcClientPrice.calc_client_price(el.text)
          end
        end
      end
    end
    item["brand"] = "Issa plus"
    item["slug_id"] = NormalizerParse.create_slug(item["name"], item["color"])

    if item.parse_info.present?
      parse_info = item.parse_info
      item["composition"] = parse_info.composition
      item["description"] = parse_info.description
      item["category"] = parse_info.category
      item["sex"] = parse_info.sex
    else
      begin
        doc = Nokogiri::HTML(open(item["article"], :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE))
      rescue OpenURI::HTTPError => ex
        puts "Handle missing url"
      end
      if doc.present?
        parsed_sex = doc.css('nav.breadcrumbs span a')&.children[1]&.text
        item["sex"] =
          if Item::WOOMAN_CATEGORIES.include?(parsed_sex)
            ["wooman"]
          elsif Item::MAN_CATEGORIES.include?(parsed_sex)
            ["man"]
          end
        table = doc&.css('.tab-content .information_tovar b')
        if table.present?
          if table.length == 3 && doc.css('.tab-content .information_tovar table.table').length == 2
            first_table_name = table[1]&.children&.map(&:text)
            second_table_name = table[2]&.children&.map(&:text)
          else
            first_table_name = table[0]&.children&.map(&:text)
            second_table_name = table[1]&.children&.map(&:text)
          end
          first_table_data = doc.css('.tab-content .information_tovar table.table')[0]&.css('tr')&.children&.map(&:text)
          second_table_data = doc.css('.tab-content .information_tovar table.table')[1]&.css('tr')&.children&.map(&:text)
          size_world = { "#{first_table_name[0]}": first_table_data }
          if second_table_name.present?
            size_world = size_world.merge({ "#{second_table_name[0]}": second_table_data })
          end
          first_table_data.present? ? item["size_world"] = size_world.to_json : ""
        end
        category = doc.css('nav.breadcrumbs span a')&.children[2]&.text
        materials = doc.css(".col-md-5 table.information_tovar tr td")
        composition = materials&.children[9]&.text.to_s + materials&.children[11]&.text.to_s
        item["category"] = NormalizerParse.set_category(category)
        item["description"] = doc.css(".col-md-5.body_inf p")&.children[0]&.text
        item["composition"] = composition
        ParseInfo.create(slug_id: item["slug_id"], composition: item["composition"], description: item["description"], category: item["category"], sex: item["sex"])
      end
    end
    NormalizerParse.capitalize_item(item)
    NormalizerParse.make_unvaliable_old_item(item)
    item.save if NormalizerParse.delete_null_item(item)
  end
end
