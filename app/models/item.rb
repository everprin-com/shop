class Item < ActiveRecord::Base
  DEFAULT_PAGE = 16
  #include ActiveModel::Serialization
  #serialize :size_world
  attr_accessor :skip
  include PgSearch
  pg_search_scope :search_color,
    against: [:color],
    :using => {
      :tsearch => {:any_word => true}
    }
  pg_search_scope :search_category, against: [:category]
  pg_search_scope :search_brand, against: [:brand]

  COLOR_SHADES = {
    black: [
      "Черный", "Черный-красный", "Черный-голубой", "Антрацит",
    ],
    yellow: [
      "Желтый", "Золотой", "Хаки", "Горчичный", "Оливковый",
    ],
    orange: [
      "Коралловый", "Персиковый", "Корал", "Телесный", "Оранжевый",
    ],
    brown: [
      "Светло-коричневый", "Темно-коричневый", "Коричневый", "Мокка",
    ],
    blue: [
      "Электрик", "Синий", "Светло-синий", "Черный-голубой", "Темно-синий",
      "Бирюзовый", "Хаки-голубой",
    ],
    lilac: [
       "Сиреневый",
    ],
    printed: [
      "Принтованный", "Принт",
    ],
    grey: [
      "Серый", "Темно-серый", "Cd-137-серый", "Светло-серый", "Антрацит", "Серебряный",
      "Серебрянный",
    ],
    red: [
      "Малиновый", "Красный", "Черный-красный", "Бордовый", "Бордо", "Хаки-красный",
    ],
    cell: [
      "Клетка",
    ],
    multicolor: [
      "Мультиколор",
    ],
    purple: [
      "Фиолетовый",
    ],
    green: [
      "Мятный", "Зеленый", "Салатовый", "Темно-зеленый", "Оливковый",
    ],
    pink: [
      "Розовый", "Коралловый", "Корал",
    ],
    white: [
      "Белый", "Бежевый", "Молочный",
    ],
  }
  BAD_CATEGORIES = ["Для девочек", "Для мальчиков", "Мужская одежда"]
  BAD_PRODUCTS_NAME = [
    "Сумка стильная, вместительная 710K001_Черный",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Бирюзово-серый",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Изумрудный",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Кофейно-коричневый",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Светло-серый",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Серо-розовый",
    "Палантин женский стильная комбинация принтов 50PD0003-2_Коричневый",
    "Палантин женский стильная комбинация принтов 50PD0003-2_Кофейный",
  ]

  GROUP = {
    clothes: [
      "Колготки", "Платья", "Майки", "Юбки", "Футболки", "Капри", "Спортивные штаны",
      "Леггинсы", "Батники", "Кардиганы", "Куртки", "Спортивные костюмы", "Топы",
      "Шорты", "Костюмы", "Свитера", "Джинсы", "Рубашки", "Домашняя одежда",
      "Нижнее белье", "Блузы", "Комбинезоны", "Купальники", "Брюки", "Пальто",
      "Жилетки", "Толстовки", "Кофты", "Пиджаки", "Спортивная одежда", "Комплекты",
      "Лонгсливы", "Свитшоты", "Туники", "Носки", "Белье", "Майка", "Худи", "Бомбер",
      "Верхняя одежда", "Джемпер", "Пижама", "Водолазка", "Боди", "Лосины",
      "Поло", "Пуловер", "Парка", "Шубы", "Жилеты",
    ],
    footwear: [
      "Угги", "Ботинки", "Сникеры", "Сапоги", "Туфли",
      "Кеды", "Кроссовки", "Эспадрильи", "Слипоны", "Мокасины", "Балетки",
      "Женская обувь", "Шлепанцы",
    ],
    accessories: [
      "Кошельки",  "Перчатки",  "Кепки", "Шляпы", "Шарфы, хомуты", "Женские шапки",
      "Сумки", "Солнцезащитные очки", "Бабочка", "Ремень", "Рюкзак", "Галстук",
      "Подтяжки", "Повязка", "Шапки", "Шляпы"
    ]
  }

  SYNONIM_NAMES_CATEGORIES = {
    "Майка": ["Майка", "Майки"],
    "Шапки": ["Женские шапки",],
    "Солнцезащитные очки": [ "Солнцезащитные очки", "Аксессуары",],
    "Туники": ["Туники", "Туника",],
    "Водолазки": ["Водолазка", "Водолазки",],
    "Носки": ["Носки", "Женские носки",],
    "Спортивные костюмы": ["Спортивный костюм", "Спортивные костюмы", "Спортивная одежда"],
    "Рубашки": ["Рубашка", "Рубашки",],
    "Сумки": ["Сумки", "Сумка",],
    "Блузы": ["Блузы", "Блузки, рубашки", "Блузка",],
    "Нижнее белье": ["Трусы", "Нижнее белье",],
    "Кардиганы": ["Кардиганы", "Кардиган",],
    "Футболки": ["Футболки", "Футболка",],
    "Шарфы, хомуты": ["Шарф", "Шарфы, хомуты",],
    "Кепки": ["Кепка", "Кепки",],
    "Перчатки": ["Перчатки", "Мужские перчатки", "Женские перчатки", ],
    "Шапка": ["Шапка", "Мужские шляпы", "Мужские шапки", ],
    "Свитера": ["Свитера",  "Свитер", "Вязаный", ],
    "Платья": ["Платья", "Платье",],
    "Батники": ["Батники", "Батник",],
    "Комбинезоны": ["Комбинезоны", "Комбинезон",],
    "Юбки": ["Юбки", "Юбка",],
    "Жилетки": ["Жилетки", "Жилет",],
    "Куртки": ["Куртки", "Куртка", "Плащ"],
    "Пиджаки": ["Пиджаки", "Пиджак",],
    "Костюмы": ["Костюмы", "Костюм", ],
    "Кофты": ["Кофты", "Кофта",],
    "Свитшоты": ["Свитшоты", "Свитшот",],
    "Толстовки": ["Толстовки", "Толстовка",],
    "Шлепанцы": ["Шлепанцы", "Босоножки", "Женские вьетнамки, сланцы", "Тапочки", "Вьетнамки",],
  }
   #1-поло
   #children: "Для девочек", "Детские шапки", "Детские платья", "Детские перчатки и варежки",
   # "Детская одежда",

  def self.update_size_same_items
    names = Item.select('items.name').group('items.name').having('count(items.name) > 1').map(&:name)
    names.map do |name|
      colors = Item.where(name: name).select(:color).map(&:color).uniq.flatten
      colors.each do |color|
        sizes = Item.where(name: name, color: color).map(&:size).flatten.uniq
        first_item = Item.where(name: name, color: color).first
        first_item.update(size: sizes)
        Item.where.not(id: first_item.id).where(name: name, color: color).map(&:delete)
      end
    end
  end

  def self.delete_bad_products
    Item.where(name: Item::BAD_PRODUCTS_NAME).delete_all
    Item.where(category: Item::BAD_CATEGORIES).delete_all
  end

  def self.generate_filters(all_items, search_category={})
    items = search_category.present? ? all_items.where(category: search_category) : all_items
    prices = items.map { |item| item.price }
    seasons =  items.map { |item| item.season }.uniq
    {
      size: items.map { |item| item.size }.flatten.uniq,
      price_min: prices.min,
      price_max: prices.max,
      brand: items.map { |item| item.brand }.uniq,
      season: seasons&.map { |season| (season&.length && season&.length > 2) ? season : "" }&.reject(&:blank?),
      color: Item.current_main_colors(items),
    }
  end

  def self.current_main_colors(items)
    all_colors = items.map { |item| item.color}.uniq
    uniq_colors = all_colors.map { |color| color&.split("/") }&.flatten.compact.map(&:capitalize).uniq
    current_main_colors = []
    uniq_colors.each do |color|
      include_color = Item::COLOR_SHADES.select{|key, hash| hash.include?(color) }
      current_main_colors << (include_color.keys)[0].to_s if include_color.present?
    end
    current_main_colors.uniq
  end

  def self.create_header
    Header.delete_all
    wooman_catalogues = Item.where('sex && ARRAY[?]::varchar[]', "wooman").select(:category).uniq.map(&:category).compact
    wooman_catalogues.map do |catalogue|
      count = Item.where(category: catalogue).count
      group = GROUP.select{ |key, hash| hash.include?(catalogue&.capitalize) }.keys[0].to_s
      Header.create!(count_items: count, catalogue: catalogue, group: group, male: false)
    end
    man_catalogues = Item.where('sex && ARRAY[?]::varchar[]', "man").select(:category).uniq.map(&:category).compact
    man_catalogues.map do |catalogue|
      count = Item.where(category: catalogue).count
      group = GROUP.select{ |key, hash| hash.include?(catalogue&.capitalize) }.keys[0].to_s
      Header.create!(count_items: count, catalogue: catalogue, group: group, male: true)
    end
  end

  def self.group_search(group)
    selected_group = Item::GROUP.select{|key, value| key.to_s == group}
    where(category: selected_group.values.flatten)
  end

  def self.name_search(query)
    self.where("similarity(name, ?) > 0.1", query).order("similarity(name, #{ActiveRecord::Base.connection.quote(query)}) DESC")
  end
end
