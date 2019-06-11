class ItemsImport
  include ActiveModel::Model
  require 'roo'
  CAPITALIZE_FIELDS = ["color", "brand", "country", "category", "drop_ship", "composition"]
  CANT_BE_NULL = ["article", "name", "price", "picture", "drop_ship", "drop_ship_price"]
  HEADER = %w[
    article name description price color picture brand
    season male size country category available_product size_world
    drop_ship composition drop_ship_price
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
    header = spreadsheet.row(5)
    (6..spreadsheet.last_row).map do |i|
       row = Hash[[HEADER, spreadsheet.row(i)[0..HEADER.size-1]].transpose]
       item = Item.find_by_id(row["id"]) || Item.new
       item.attributes = row.to_hash
       #conver_size_to_array(row)
       item["size"] = conver_size_to_array(row)
       item["price"] = CalcClientPrice.calc_client_price(row["drop_ship_price"])
       item["picture"] = row["picture"]&.split(",")
       item
    end
  end

  def conver_size_to_array(row)
    return [] unless row["size"]
    a = row["size"].split("-")
    return [] if a[0].to_i == 0 #if string universal return nil
    (a[0].to_i..a[1].to_i).to_a
  end

  def imported_items
    @imported_items ||= load_imported_items
  end

  def delete_null(imported_items)
    CANT_BE_NULL.each do |field|
      #byebug
      imported_items.reject! { |item| item[field.to_sym] == nil }
    end
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
