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
    Item.delete_same_slug_ids
    Item.create_header
    FilterOption.delete_all
    FilterOption.create!(Item.generate_filters(Item.all))
  end
  #""
  def self.create_slug(name, color)
    return if !name
    translated_slug = Translit.convert(name + " " + ( color || "color"), :english)
    translated_slug&.gsub(/ |-/,'_')&.remove("'", ".", ",")&.gsub("/", "_")&.downcase
  end

  def self.delete_null_item(item)
    Item::CANT_BE_NULL.each do |field|
      return false if item[field.to_sym] == nil || item[:picture].length == 0
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

  def self.delete_old_drop_ship(imported_items)
    old_drop_ships = imported_items.map(&:drop_ship).uniq
    Item.where(drop_ship: old_drop_ships).delete_all
  end
end
