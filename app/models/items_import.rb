class ItemsImport
  include ActiveModel::Model
  require 'roo'
  HEADER = %w[code name article strih_code goods brand]
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
      row = Hash[[HEADER, spreadsheet.row(i).reject.with_index{|v, i| i == 0 }[0..HEADER.size-1]].transpose]
      item = Item.find_by_id(row["id"]) || Item.new
      item.attributes = row.to_hash
      item
    end
  end

  def imported_items
    @imported_items ||= load_imported_items
  end

  def save
    if imported_items.map(&:valid?).all?
      imported_items.each(&:save!)
      true
    else
      imported_items.each_with_index do |item, index|
        item.errors.full_messages.each do |msg|
          errors.add :base, "Row #{index + 6}: #{msg}"
        end
      end
      false
    end
  end

end
