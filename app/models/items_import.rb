class ItemsImport
  include ActiveModel::Model
  require 'roo'
  WOOMAN_CATEGORIES = ["Женская одежда", "Женские аксессуары", "Женская обувь", "Для женщин"]
  MAN_CATEGORIES = ["Мужская одежда", "Мужские аксессуары", "Мужская обувь", "Для мужчин"]
  CAPITALIZE_FIELDS = ["color", "brand", "country", "category", "drop_ship", "composition"]
  CANT_BE_NULL = ["article", "name", "category", "price", "picture", "drop_ship", "drop_ship_price", "sex"]
  HEADER = %w[
    drop_ship_price drop_ship name article color size description brand
    composition season skip skip1 picture small_picture
  ]

  HEADER_TIME_OF_STYLE = %w[
    skip	skip1	drop_ship	name article	skip2	category brand	skip3	size
    color	country	sex	season	composition	size_world
    skip4	drop_ship_price	skip5	skip6	skip7	picture
    small_picture	small_picture1	small_picture2	small_picture3
    small_picture4	small_picture5
  ]

  attr_accessor :file

  def initialize(attributes={})
    attributes.each { |name, value| send("#{name}=", value) }
  end

  def persisted?
    false
  end

  def open_spreadsheet
    case File.extname(file.original_filename)
    when ".csv" then Csv.new(file.path)
    when ".xls" then Roo::Excel.new(file.path)
    when ".xlsx" then Roo::Excelx.new(file.path)
    else raise "Unknown file type: #{file.original_filename}"
    end
  end

  def load_imported_items
    spreadsheet = open_spreadsheet
    #header = spreadsheet.row(5)
    (3..spreadsheet.last_row).map do |i|
       row = Hash[[HEADER_TIME_OF_STYLE, spreadsheet.row(i)[0..HEADER_TIME_OF_STYLE.size-1]].transpose]
       #item = Item.find_by_id(row["id"]) || Item.new
       p "item"
       p i
       item = Item.new
       if row["drop_ship"] == "issaplus"
         doc = Nokogiri::HTML(open(row["article"], :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE))
         #doc.css('nav.breadcrumbs span a').children
         parsed_sex = doc.css('nav.breadcrumbs span a')&.children[1]&.text
         table = doc.css('.tab-content .information_tovar b')
         if table.present?
           if table.length == 3 && doc.css('.tab-content .information_tovar table.table').length == 2
             first_table_name = table[1]&.children&.map(&:text)
             second_table_name = table[2]&.children&.map(&:text)
           else
             first_table_name = table[0]&.children&.map(&:text)
             second_table_name = table[1]&.children&.map(&:text)
           end
           item["sex"] =
             if WOOMAN_CATEGORIES.include?(parsed_sex)
               ["wooman"]
             elsif MAN_CATEGORIES.include?(parsed_sex)
               ["man"]
             end
           first_table_data = doc.css('.tab-content .information_tovar table.table')[0]&.css('tr')&.children&.map(&:text)
           second_table_data = doc.css('.tab-content .information_tovar table.table')[1]&.css('tr')&.children&.map(&:text)
           size_world = { "#{first_table_name[0]}": first_table_data }
           if second_table_name.present?
             size_world= size_world.merge({ "#{second_table_name[0]}": second_table_data })
          end
          item["size_world"]  = size_world
         end
         category = doc.css('nav.breadcrumbs span a')&.children[2]&.text
         item["category"] = set_category(category)
         item["price"] = CalcClientPrice.calc_client_price(row["drop_ship_price"])
         item["drop_ship_price"] = row["drop_ship_price"] * 0.85
         item["size"] = row["size"].is_a?(Float) ? [row["size"].round] : row["size"].to_s.split(",")
         item["color"] = row["color"].to_s.split("_").last
         item["description"] = doc.css(".col-md-5.body_inf p")&.children[0]&.text
         item["composition"] = row["description"].to_s  + "," +  row["composition"].to_s
         picture = row["picture"]&.split(" ")&.split(",")&.flatten || []
         small_picture = row["small_picture"]&.split(",")&.flatten
         item["picture"] = (picture + small_picture).uniq
       else
         #sex = row["male"]&.split(" ")&.split(",")&.flatten
         #item["sex"] = sex ? sex : ["man", "wooman"]
         # if i == 5
         #   byebug
         # end
         item["size"] = row["size"].is_a?(Float) ? [row["size"].round] : row["size"].to_s.split("/")
         item["picture"] = row["picture"]&.split(" ")&.split(",")&.flatten
         item["drop_ship_price"] = row["drop_ship_price"]
         item["category"] = set_category(row["category"])
         item["color"] = row["color"]
         item["sex"] =
           if WOOMAN_CATEGORIES.include?(row["sex"])
             ["wooman"]
           elsif MAN_CATEGORIES.include?(row["sex"])
             ["man"]
           end
         item["composition"] = row["composition"]
         item["size_world"] = row["size_world"]
         picture = [row["picture"]]
         [
           row["small_picture"], row["small_picture1"],	row["small_picture2"],
           row["small_picture3"], row["small_picture4"], row["small_picture5"],
         ].map do |small_picture|
           picture.push(small_picture).compact.uniq
        end
        item["picture"] = picture.compact
       end
       item["country"] = row["country"]
       item["price"] = CalcClientPrice.calc_client_price(row["drop_ship_price"])
       item["name"] = row["name"]
       item["brand"] = row["brand"]
       item["season"] = row["season"]
       item["drop_ship"] = row["drop_ship"]
       item["article"] = row["article"]
       item
    end
  end

  def set_category(category)
    return unless category
    synonim_category = Item::SYNONIM_NAMES_CATEGORIES.select{ |key, hash| hash.include?(category&.capitalize) }.keys[0].to_s
    synonim_category.present? ? synonim_category : category
  end

  def conver_size_to_array(row)
    return [] unless row["size"]
    parser_dash = row["size"].split("-")
    parser_colon = row["size"].split(" ")
    type_parser = [parser_dash, parser_colon].max_by(&:length)
    if type_parser == parser_dash
      return [] if parser_dash[0].to_i == 0 #if string universal return nil
      (parser_dash[0].to_i..parser_dash[1].to_i).to_a
    elsif type_parser == parser_colon
      return [] if parser_colon[0].to_i == 0
      [parser_colon[0], parser_colon[3], parser_colon[6], parser_colon[9]].compact
    end
  end

  def imported_items
    @imported_items ||= load_imported_items
  end

  def delete_null(imported_items)
    CANT_BE_NULL.each do |field|
      imported_items.reject! { |item| item[field.to_sym] == nil }
    end
  end

  def delete_old_drop_ship(imported_items)
    old_drop_ships = imported_items.map(&:drop_ship).uniq
    Item.where(drop_ship: old_drop_ships).delete_all
  end

  def capitalize_fields(imported_items)
   CAPITALIZE_FIELDS.each do |field|
      imported_items.each { |item| item.public_send("#{field}=", item.public_send("#{field}")&.capitalize) }
    end
  end

  def save
    if imported_items.map(&:valid?).all?
      delete_null(imported_items)
      capitalize_fields(imported_items)
      delete_old_drop_ship(imported_items)
      imported_items.each(&:save!)
      true
    else
      # imported_items.each_with_index do |item, index|
      #   item.errors.full_messages.each do |msg|
      #     errors.add :base, "Row #{index + 6}: #{msg}"
      #   end
      # end
      false
    end
  end

end
