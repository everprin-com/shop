module  Parser
  class Convertor

    def self.convert_xml_to_db
      Rake::Task['parser_xml:parser_xml'].execute
    end

    def self.convert_xls_to_db
      files = Dir.entries("public/excel/parser")
      files.delete(".")
      files.delete("..")
      files.map do |file_name|
        #file = Roo::Spreadsheet.open("public/excel/parser/#{file_name}")
        file = File.open("public/excel/parser/#{file_name}", "r")
        drop_ship_name = file_name.split("_")[0]
        artwork = ActionDispatch::Http::UploadedFile.new(
          filename: file_name,
          content_type: "application/vnd.ms-excel",
          tempfile: file,
        )
        # drop_ship named prices is garne
        drop_ship_name = drop_ship_name =="prices" ? "garne" : drop_ship_name
        @items_import = ItemsImport.new({:file => artwork}, drop_ship_name)
        @items_import.save
      end
      NormalizerParse.normalizer_products(Item::XLS_DROP_SHIPPER)
    end
  end
end
