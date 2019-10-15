require 'yaml'

namespace :create_yml do

  task create_yml: :environment do
    # files = Dir.entries("public/excel/parser_xml")
    # files.delete(".")
    # files.delete("..")
    d = YAML::load_file('public/yml/test.yml') #Load
    #d['session'] = 2 #Modify
    File.open('public/yml/test.yml', 'w') do |f|
      Item.find_each do |item|
        d["name"] = item.name
        #d["price"] = item.price
        #d["category"] = item.category
        f.write d.to_yaml
      end
    end
     #Store
  end
end
