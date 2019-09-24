class ItemsImport
  include ActiveModel::Model
  require 'roo'
  WOOMAN_CATEGORIES = [
    "Женская одежда", "Женские аксессуары", "Женская обувь", "Для женщин", "женский",
  ]
  MAN_CATEGORIES = [
    "Мужская одежда", "Мужские акс ессуары", "Мужская обувь", "Для мужчин", "мужской",
  ]
  UNISEX_CATEGORIES = [ "унисекс"]
  CAPITALIZE_FIELDS = ["color", "brand", "country", "category", "drop_ship", "composition"]
  CANT_BE_NULL = ["article", "name", "category", "price", "picture", "drop_ship", "drop_ship_price", "sex"]
  HEADER_ISSA_PLUS = %w[
    drop_ship_price currency name article color size description brand
    composition season skip skip1 picture small_picture
  ]

  HEADER_TIME_OF_STYLE = %w[
    skip	skip1	code	skip2	name article category brand	skip3	size
    color	country	sex	season	composition	size_world
    skip4	drop_ship_price	skip5	skip6	skip7	picture
    small_picture	small_picture1	small_picture2	small_picture3
    small_picture4	small_picture5
  ]

  HEADER_GARNE = %w[
    skip code	name color drop_ship_price skip1 size skip2 category
    brand article	composition description picture sex
  ]


  attr_accessor :file

  def initialize(attributes={}, name_drop_ship)
    attributes.each { |name, value| send("#{name}=", value) }
    @name_drop_ship = name_drop_ship
  end

  def persisted?
    false
  end

  def open_spreadsheet
    case File.extname(file.original_filename)
    when ".csv" then Roo::CSV.new(file.path, csv_options: {col_sep: "\t"})
    when ".xls" then Roo::Excel.new(file.path)
    when ".xlsx" then Roo::Excelx.new(file.path)
    else raise "Unknown file type: #{file.original_filename}"
    end
  end

  def find_drop_shiper
    case @name_drop_ship
    when "issaplus"
      HEADER_ISSA_PLUS
    when "tos"
      HEADER_TIME_OF_STYLE
    when "ager"
      HEADER_TIME_OF_STYLE
    when "garne"
      HEADER_GARNE
    else
      return
    end
  end

  def load_imported_items
    spreadsheet = open_spreadsheet
    #header = spreadsheet.row(5)
    (2..spreadsheet.last_row).map do |i|
       row = Hash[[find_drop_shiper, spreadsheet.row(i)[0..find_drop_shiper.size-1]].transpose]
       p "item"
       p i
       item = Item.new
       if @name_drop_ship == "issaplus"
         doc = Nokogiri::HTML(open(row["article"], :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE))
         parsed_sex = doc.css('nav.breadcrumbs span a')&.children[1]&.text
         item["sex"] =
           if WOOMAN_CATEGORIES.include?(parsed_sex)
             ["wooman"]
           elsif MAN_CATEGORIES.include?(parsed_sex)
             ["man"]
           end
         table = doc.css('.tab-content .information_tovar b')
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
         item["category"] = set_category(category)
         item["price"] = CalcClientPrice.calc_client_price(row["drop_ship_price"])
         item["drop_ship_price"] = row["drop_ship_price"] * 0.85
         item["size"] = conver_size_to_array(row["size"])
         item["color"] = row["color"].to_s.split("_").last
         item["description"] = doc.css(".col-md-5.body_inf p")&.children[0]&.text
         item["composition"] = row["description"].to_s  + "," +  row["composition"].to_s
         picture = row["picture"]&.split(" ")&.split(",")&.flatten || []
         small_picture = row["small_picture"]&.split(",")&.flatten
         item["picture"] = (picture + small_picture).uniq
       elsif @name_drop_ship == "tos" || @name_drop_ship == "ager"
         item["size"] = conver_size_to_array(row["size"])
         item["drop_ship_price"] = row["drop_ship_price"]
         item["category"] = set_category(row["category"])
         item["color"] = row["color"]
         item["sex"] =
           if WOOMAN_CATEGORIES.include?(row["sex"])
             ["wooman"]
           elsif MAN_CATEGORIES.include?(row["sex"])
             ["man"]
           elsif UNISEX_CATEGORIES.include?(row["sex"])
             ["man", "wooman"]
           end
         item["composition"] = row["composition"]
         if row["size_world"].present?
           item["size_world"] = ({ "#{row['category']}": [row["size_world"]] }).to_json
         end
         picture = [row["picture"]]
         [
           row["small_picture"], row["small_picture1"],	row["small_picture2"],
           row["small_picture3"], row["small_picture4"], row["small_picture5"],
         ].map do |small_picture|
           picture.push(small_picture).compact.uniq
        end
        item["picture"] = picture.compact.uniq
       elsif @name_drop_ship == "garne"
         item["picture"] = row["picture"].split(",")
         item["size"] = row["size"]
         item["drop_ship_price"] = row["drop_ship_price"]
         item["size_world"]= row["description"]
         item["color"] = row["color"]
         item["category"] = row["category"]&.split(",")[0]
         item["composition"] = row["composition"]
         item["size"] = row["size"]
         item["sex"] =
           if WOOMAN_CATEGORIES.include?(row["sex"])
             ["wooman"]
           elsif MAN_CATEGORIES.include?(row["sex"])
             ["man"]
           elsif UNISEX_CATEGORIES.include?(row["sex"])
             ["man", "wooman"]
           end
       end
       item["country"] = row["country"]
       item["price"] = CalcClientPrice.calc_client_price(row["drop_ship_price"])
       item["name"] = convert_name(row["name"])
       item["brand"] = row["brand"]
       item["season"] = row["season"]
       item["drop_ship"] = @name_drop_ship
       item["article"] = row["article"]
       #byebug
       item
    end
  end

  def convert_name(name)
    return unless name
    name&.split("_")&.join(" ")&.scan(/[^0-9]+/)&.join("")
  end

  def set_category(category)
    return unless category
    synonim_category = Item::SYNONIM_NAMES_CATEGORIES.select{ |key, hash| hash.include?(category&.capitalize) }.keys[0].to_s
    synonim_category.present? ? synonim_category : category
  end

  def conver_size_to_array(size)
    return [] unless size
    converted_size = size.is_a?(Float) ? [size.round.to_s] : size.to_s.split(",")&.flatten
    converted_size =
      converted_size&.flatten.map do |size|
        size.split("/")
      end
    # make from "34-36" => ["34", "35", "36"]
    converted_size =
      converted_size&.flatten.map do |size|
        if size.include?("-") && size.size > 1 && size.split("-")[0].to_i != 0 # one "-" && prevent "S-M"
          (size.split("-")[0]..size.split("-")[1])&.to_a
        else
          size
        end
      end
    converted_size&.flatten&.uniq
  end

  # def conver_size_to_array(row)
  #   return [] unless row["size"]
  #   parser_dash = row["size"].split("-")
  #   parser_colon = row["size"].split(" ")
  #   type_parser = [parser_dash, parser_colon].max_by(&:length)
  #   if type_parser == parser_dash
  #     return [] if parser_dash[0].to_i == 0 #if string universal return nil
  #     (parser_dash[0].to_i..parser_dash[1].to_i).to_a
  #   elsif type_parser == parser_colon
  #     return [] if parser_colon[0].to_i == 0
  #     [parser_colon[0], parser_colon[3], parser_colon[6], parser_colon[9]].compact
  #   end
  # end

  def imported_items
    @imported_items ||= load_imported_items
  end

  def delete_null(imported_items)
    CANT_BE_NULL.each do |field|
      imported_items.reject! do |item|
        item[field.to_sym] == nil || item[:picture].length == 0
      end
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
