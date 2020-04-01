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
    parsed_drop_shipper_company = doc.elements.each("yml_catalog/shop/company") {|name| name}[0]
    drop_shipper_company = parsed_drop_shipper_company.present? ? parsed_drop_shipper_company[0] : nil
    parsed_drop_shipper_name = doc.elements.each("yml_catalog/shop/name") {|name| name}[0]
    drop_shipper_name = parsed_drop_shipper_name.present? ? parsed_drop_shipper_name[0] : nil
    drop_shipper = drop_shipper_name || drop_shipper_company
    doc.elements.each("yml_catalog/shop/categories/category") do |category|
      mod_cat = { "#{category.text.gsub("\n", '')}": {id: category.attributes["id"], parentId: category.attributes["parentId"], seo_h1: category.attributes["seo_h1"]}}
      categories.merge!(mod_cat)
    end
    if doc.elements.each("content") {|name| name}[0]&.present?
      doc.elements.each_with_index("content/products/product") do |product, index|
        if index == 0
          Item.where(drop_ship: "Issaplus").update_all(available_product: false)
          #Item.where(drop_ship: "Issaplus").delete_all
        end
        IssaPlusParser.parse_xml(product, index, "Issaplus")
      end
    else
      doc.elements.each_with_index("yml_catalog/shop/offers/offer") do |offer, index|
        used_drop = drop_shipper.to_s.split(" ")[0]
        #converted_drop_shipper == "OLLA™" ? used_drop = "OLLA" : used_drop = converted_drop_shipper
        if index == 0
          Item.where(drop_ship: used_drop&.capitalize).update_all(available_product: false)
          Item.where(drop_ship: drop_shipper_company.to_s).update_all(available_product: false)
          # Item.where(drop_ship: used_drop&.capitalize).delete_all
          # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          # Item.where(drop_ship: drop_shipper_company.to_s).delete_all
          # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        end

        #if used_drop == "OLLA"
          #OllaParser.parse_xml_olla(offer, index, categories, used_drop)
        if drop_shipper_company == "Modus"
          ModusParser.parse_xml_olla(offer, index, categories, drop_shipper_company)
        end
        if used_drop == "Villomi"
          VillaParser.parse_xml_olla(offer, index, categories, used_drop)
        elsif used_drop == "Vzuto"
          VzutoParser.parse_xml_olla(offer, index, categories, used_drop)
        end
      end
    end
    NormalizerParse.normalizer_products
  end
end
