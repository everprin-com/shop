require 'roo'
require 'spreadsheet'

MUST_BE_KEY_EXCEL = [
  "article", "name", "description", "price", "color", "picture", "brand", "season", "male",
  "size", "country", "category", "presence", "size_world", "drop_ship", "composition", "drop_ship_price", "picture_small", "link"
]
namespace :create_fid_issa do

  task create_fid_issa: :environment do
    begin
      new_book = Spreadsheet::Workbook.new
      new_book.create_worksheet :name => 'Sheet Name'
      #sheet = book.worksheet 0
      #sheet2 = book.create_worksheet :name => 'My Second Worksheet'
      iter = 0
      items = Item.where(drop_ship: "Issaplus")
      new_book.worksheet(0).insert_row(0, ["Page URL", " "])
      new_book.write("public/converted_fid_issa.xls")
      items.each_with_index do |item, index|
        p "index"
        p index
        sorted_array = []
        url = "https://kilo.com.ua/productcart/#{item[:slug_id]}"
        desctiption = item[:description] ? "description" : ""
        color = item[:color] ? "#{item[:color]}; " : " "
        fid_description = "#{item[:name]}; " + "#{item[:category]}; " + color + "#{item[:sex][0]}; " + description
        sorted_array.push(url, fid_description)
        new_book.worksheet(0).insert_row(index + 1, sorted_array)
        new_book.write("public/converted_fid_issa.xls")
      end
    rescue Zip::Error
      Roo::Spreadsheet.open(filepath)
    end
  end

end
