require 'roo'
require 'spreadsheet'

MUST_BE_KEY_EXCEL = [
  "article", "name", "description", "price", "color", "picture", "brand", "season", "male",
  "size", "country", "category", "presence", "size_world", "drop_ship", "composition", "drop_ship_price"
]
namespace :convert_excel do

  task convert_excel: :environment do
    begin
      files = Dir.entries("public/excel/origin")
      files.delete(".")
      files.delete("..")
      files.map do |file|
        book =  Spreadsheet.open ("public/excel/origin/#{file}")
        new_book = Spreadsheet::Workbook.new
        new_book.create_worksheet :name => 'Sheet Name'
        sheet = book.worksheet 0
        sheet2 = book.create_worksheet :name => 'My Second Worksheet'
        iter = 0
        sheet.each_with_index do |row, index|
          if index == 0
            @current_key_excel = row
            next
          end
          break if row.length < 1
          sorted_array = []
          row.each_with_index do |row_new, index_new|
            sicking_key_index = @current_key_excel.index(MUST_BE_KEY_EXCEL[index_new])
            next if !sicking_key_index
            sorted_array.push(row[sicking_key_index])
          end
          new_book.worksheet(0).insert_row(index, sorted_array)
          new_book.write("public/excel/converted/converted_#{file}")
        end
      end
    rescue Zip::Error
      Roo::Spreadsheet.open(filepath)
    end
  end

end
