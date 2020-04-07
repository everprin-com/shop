class SaveToDbParsed
  include Sidekiq::Worker

  def perform(*args)
    p "load!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    FileUtils.rm_rf('public/excel/parser_xml')
    FileUtils.mkdir_p('public/excel/parser_xml')
    Admins::Admin::XML_LINK.map do |link|
      download = open(link)
      IO.copy_stream(download, "public/excel/parser_xml/#{link.split('/')[-1]}")
    end
    FileUtils.rm_rf('public/excel/parser')
    FileUtils.mkdir_p('public/excel/parser')
    Admins::Admin::XLS_LINK.map do |link|
      download = open(link)
      IO.copy_stream(download, "public/excel/parser/#{link.split('/')[-1]}")
    end
    Parser::Convertor.convert_xls_to_db
    system "bundle exec rake parser_xml:parser_xml"
    #Parser::Convertor.convert_xml_to_db
  end
end
