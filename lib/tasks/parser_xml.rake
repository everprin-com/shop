require 'roo'
require 'spreadsheet'
require 'net/http'
require "rexml/document"

namespace :parser_xml do
  task parser_xml: :environment do
    begin
      files = Dir.entries("public/excel/parser_xml")
      files.delete(".")
      files.delete("..")
      files.map do |file_name|
        file = File.open("public/excel/parser_xml/#{file_name}", "r")
        parser_xml_service = ParserXmlService.new(file)
        parser_xml_service.parse_xml
      end
    rescue Zip::Error
      Roo::Spreadsheet.open(filepath)
    end
  end

end
