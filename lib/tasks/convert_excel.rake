require 'roo'
require 'roo-xls'
require 'mimemagic'
require 'mimemagic/overlay'

namespace :convert_excel do

  task convert_excel: :environment do
    begin
      #workbook = MimeMagic.by_magic(File.open('public/excel/123.xls'))

      workbook = Roo::Spreadsheet.open("public/excel/123.xls", extension: :xls)
      byebug
      #Roo::Spreadsheet.open(filepath, extension: :xlsx)
    rescue Zip::Error
      Roo::Spreadsheet.open(filepath)
    end

  end

end
