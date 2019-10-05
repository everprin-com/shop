class ParserXmlService
  attr_accessor :file

  def initialize(file)
    #attributes.each { |name, value| send("#{name}=", value) }
    @file = file
  end

  def parse_xml
    doc = REXML::Document.new file
    hash = Hash.from_xml(file)
    categories = {}
    drop_shipper_company = doc.elements.each("yml_catalog/shop/company") {|name| name}[0][0]
    drop_shipper_name = doc.elements.each("yml_catalog/shop/name") {|name| name}[0][0]
    drop_shipper = drop_shipper_name || drop_shipper_company
    doc.elements.each("yml_catalog/shop/categories/category") do |category|
      mod_cat = { "#{category.text.gsub("\n", '')}": {id: category.attributes["id"], parentId: category.attributes["parentId"], seo_h1: category.attributes["seo_h1"]}}
      categories.merge!(mod_cat)
    end
    doc.elements.each_with_index("yml_catalog/shop/offers/offer") do |offer, index|
      converted_drop_shipper = drop_shipper.to_s.split(" ")[0]
      converted_drop_shipper == "OLLA™" ? used_drop = "OLLA" : used_drop = converted_drop_shipper
      if index == 0
        Item.where(drop_ship: used_drop.capitalize).delete_all
        #Item.where(drop_ship: drop_shipper.to_s).delete_all
      end
      #if used_drop == "OLLA"
        #OllaParser.parse_xml_olla(offer, index, categories, used_drop)
      if used_drop == "Villomi"
        VillaParser.parse_xml_olla(offer, index, categories, used_drop)
      elsif used_drop == "Vzuto"
        VzutoParser.parse_xml_olla(offer, index, categories, used_drop)
      end
    end
    Item.update_size_same_items
    Item.delete_bad_products
    Item.create_header
    FilterOption.delete_all
    FilterOption.create!(Item.generate_filters(Item.all))
  end
end
