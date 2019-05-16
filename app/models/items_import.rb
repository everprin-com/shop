class ItemsImport
  include ActiveModel::Model
  require 'roo'
  HEADER = %w[article name description price color picture brand season male size country category presence size_world drop_ship composition]
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
       conver_size_to_array(row)
       item["size"] = conver_size_to_array(row)
       item
    end
  end

  def conver_size_to_array(row)
    a = row["size"].split("-")
    (a[0].to_i..a[1].to_i).to_a
  end

  def imported_items
    @imported_items ||= load_imported_items
  end

  def save
    if imported_items.map(&:valid?).all?
      #byebug
      #imported_items.reject! {|item| item.picture == nil}
      imported_items.reject! {|item| item.brand == nil}
      imported_items.each {|item| item.color = item.color&.capitalize}
      imported_items.each {|item| item.brand = item.brand.capitalize}

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
