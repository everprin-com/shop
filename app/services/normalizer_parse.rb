class NormalizerParse

  def self.delete_null(imported_items)
    Item::CANT_BE_NULL.each do |field|
      imported_items.reject! do |item|
        item[field.to_sym] == nil || item[:picture].length == 0
      end
    end
  end

  def self.normalizer_products
    Item.update_size_same_items
    Item.delete_bad_products
    # Item.delete_same_slug_ids
    Item.create_header
    FilterOption.delete_all
    FilterOption.create!(Item.generate_filters(Item.all))
  end

  def self.conver_size_to_array(size)
    return [] unless size
    converted_size = size.is_a?(Float) ? [size.round.to_s] : size.to_s.split(",")&.flatten
    converted_size =
      converted_size&.flatten.map do |size|
        size.split("/")
      end
    #  make from "XXS-S" => ["XXS", "XS", "S"]
    if !size.is_a?(Float) && size.include?("-") && Item::ROME_SIZE.include?(size.split("-")[0])
      range_size = size.split("-")
      first_size = Item::ROME_SIZE.index(size.split("-")[0])
      last_size = Item::ROME_SIZE.index(size.split("-")[1])
      converted_size = Item::ROME_SIZE[first_size..last_size]
    end
    #  make from "2xl/3xl, 4xl/5xl, l/xl, s/m" => ["XXS", "XS", "S"]
    # if !size.is_a?(Float) && Item::ROME_SIZE.include?(size.split(",").split("/")&.upcase[0])
    #   converted_size = size.split(",").split("/")&.map(&:upcase)
    #   #converted_size = Item::ROME_SIZE[first_size..last_size]
    # end
    # make from "34-36" => ["34", "35", "36"]
    converted_size =
      converted_size&.flatten.map do |size|
        if size.include?("-") && size.size > 1 && size.split("-")[0].to_i != 0 # one "-" && prevent "S-M"
          (size.split("-")[0]..size.split("-")[1])&.to_a
        else
          size
        end
      end
    converted_size&.flatten&.uniq - ["."]
  end

  def self.create_slug(name, color)
    return if !name
    translated_slug = Translit.convert(name + " " + ( color || "color"), :english)
    translated_slug&.gsub(/ |-/,'_')&.remove("'", "#", ".", ",", "+", "(", ")", "&quot;", "&")&.gsub("/", "_")&.gsub("__","_").downcase
  end

  def self.delete_null_item(item)
    Item::CANT_BE_NULL.each do |field|
      return false if item[field.to_sym] == nil || item[:picture].compact.length == 0
      # return false if ((item[:size_world]&.compact&.length && item[:size_world]&.compact&.length < 10) || item[field.to_sym] == nil || item[:picture].compact.length == 0)
    end
  end

  def self.set_category(category)
    return unless category
    synonim_category = Item::SYNONIM_NAMES_CATEGORIES.select{ |key, hash| hash.include?(category&.capitalize) }.keys[0].to_s
    synonim_category.present? ? synonim_category : category
  end

  def self.set_season(season)
    return unless season
    synonim_season = Item::SEASON_GROUP.select{ |key, hash| hash.include?(season&.capitalize) }.keys[0].to_s
    synonim_season.present? ? synonim_season&.split("/") : season&.split("/")
  end

  def self.get_sex_by_name(name)
    return unless name
    named_product = name.split(" ")&.map(&:capitalize)
    if NormalizerParse.non_uniq(named_product + Item::MAN_CATEGORIES).present?
      ["man"]
    elsif NormalizerParse.non_uniq(named_product + Item::WOOMAN_CATEGORIES).present?
      ["wooman"]
    else
      ["man", "wooman"]
    end
  end

  def self.get_category_by_name(name)
    return unless name
    named_product = name.split(" ")&.map(&:capitalize)
    present_categories = Item::SYNONIM_NAMES_CATEGORIES.values.flatten.uniq
    founded_categories = NormalizerParse.non_uniq(named_product + present_categories)
    founded_categories.present? ? founded_categories[0] : name
  end

  def self.get_counts(keys)
    counts = Hash.new(0)
    keys.each {|k| counts[k] += 1 }
    counts
  end

  def self.non_uniq(elements)
    counts = get_counts(elements)
    counts.delete_if {|k, v| v < 2 }
    elements.select {|e| counts.key?(e) }
  end


  def self.capitalize_item(item)
     Item::CAPITALIZE_FIELDS.each do |field|
       item.public_send("#{field}=", item.public_send("#{field}")&.capitalize)
    end
  end

  def self.capitalize_fields(imported_items)
   Item::CAPITALIZE_FIELDS.each do |field|
      imported_items.each { |item| item.public_send("#{field}=", item.public_send("#{field}")&.capitalize) }
    end
  end

  def self.make_unvaliable_old_drop_ship(imported_items)
    #byebug
    old_drop_ships = imported_items.map(&:drop_ship).uniq
    old_slug_ids = imported_items.map(&:slug_id)
    Item.where(slug_id: old_slug_ids).delete_all
    Item.where(drop_ship: old_drop_ships).update_all(available_product: false)
  end

  def self.make_unvaliable_old_item(item)
    Item.where(slug_id: item.slug_id).delete_all
  end
end

