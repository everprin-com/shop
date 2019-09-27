class NormalizerParse

  def self.delete_null(imported_items)
    Item::CANT_BE_NULL.each do |field|
      imported_items.reject! do |item|
        item[field.to_sym] == nil || item[:picture].length == 0
      end
    end
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
    Item.where(drop_ship: old_drop_ships.capitalize).delete_all
  end
end
