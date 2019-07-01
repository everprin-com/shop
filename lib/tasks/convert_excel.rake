require 'roo'
require 'rubyXL'
require 'spreadsheet'

must_be_key_excel = [
  "article", "name", "description", "price", "color", "picture", "brand", "season", "male",
  "size", "country", "category", "presence", "size_world", "drop_ship", "composition", "drop_ship_price"
]
namespace :convert_excel do

  task convert_excel: :environment do
    begin
      book =  Spreadsheet.open ("public/excel/123.xls")
      sheet = book.worksheet 0
      sheet2 = book.create_worksheet :name => 'My Second Worksheet'
      iter = 0
      sheet.each_with_index do |row, index|
        if index == 0
          @current_key_excel = row
          next
        end
        iter +=1
        p iter
        sicking_key_index = @current_key_excel.index(must_be_key_excel[index-1])
        row[index-1] = row[sicking_key_index]
        row[sicking_key_index] = row[index-1]

      end
      book.write('public/excel/123.xls')
      #sheet1 = book.worksheet(0)

      #workbook = Roo::Spreadsheet.open("public/excel/123.xls", extension: :xls)
      #byebug
      #Roo::Spreadsheet.open(filepath, extension: :xlsx)
    rescue Zip::Error
      Roo::Spreadsheet.open(filepath)
    end

  end

end
