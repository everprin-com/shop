class Item < ActiveRecord::Base
  DEFAULT_PAGE = 16
  #extend FriendlyId
  #friendly_id :article, use: :slugged
  #include ActiveModel::Serialization
  #serialize :size_world
  
  has_one :parse_info, foreign_key: "slug_id", primary_key: "slug_id"

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
  CAPITALIZE_FIELDS = ["color", "brand", "country", "category", "drop_ship", "composition"]
  CANT_BE_NULL = [
    "article", "name", "category", "price",
    "picture", "drop_ship", "drop_ship_price",
    "sex"
  ]

  WOOMAN_CATEGORIES = [
    "Женская одежда", "Женские аксессуары", "Женская обувь", "Для женщин", "женский",
    "Женское", "Женские", "Женская", "Женская обувь зима", "Женская спортивная обувь", "Женская обувь лето 2019",
     "Женская обувь осень 2019", "Женский", "Девушек",#del "Сапоги"
  ]

  MAN_CATEGORIES = [
    "Мужская одежда", "Мужское", "Мужские", "Мужские аксессуары", "Мужская обувь", "Для мужчин", "Мужской",
    "Мужская обувь осень", "мужской",

  ]

  UNISEX_CATEGORIES = [ "унисекс", "Средство по уходу за обувью"]

  BAD_CATEGORIES = [
    "Для девочек", "Для мальчиков", "Мужская одежда", "Замшевые", "Шляпы", "Митенки", "Носки", "Детская одежда", "Детские платья",
  ]

  BAD_SLUG_IDS = [
    "botinki_zimnie_na_kabluke_chernyj", "noski_zhenskie_21p011_1_sine_belyj_sine_belyj",
    "zhenskie_chernye_zamshewye_lofery_chernyj",
  ]

  BAD_PRODUCTS_NAME = [
    "Сумка стильная, вместительная 710K001_Черный",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Бирюзово-серый",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Изумрудный",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Кофейно-коричневый",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Светло-серый",
    "Палантин женский легкий, с бахромой по краям 50PD0003-1_Серо-розовый",
    "Палантин женский стильная комбинация принтов 50PD0003-2_Коричневый",
    "Палантин женский стильная комбинация принтов 50PD0003-2_Кофейный",
    "Тапочки женские 19PL148-1_Черный", "Футболка 516F556_Фото-принт" ,
    "Поясная сумочка-конверт черного цвета", "Сумка-конверт на пояс из натуральной кожи молочного цвета",
    "Кожаная сумочка-клатч с ремнем на пояс и через плече",
  ]

  BAD_NAMED_ITEM = [
    "Junior",
  ]

  ROME_SIZE = ["XXS",	"XS",	"S", "M", "L",	"XL",	"XXL", "XXXL"]

  SEASON_GROUP = {
    "Лето": ["Лето", "Летний", "Весенне-летний",],
    "Зима": ["Зима", "Зимний", "зима", ],
    "Весна/Осень/Лето/Зима": [
      "Всесезонная модель", "Мультисезон", "Демисезон", "Деми",
      "Демисезон,весна/лето", "Весна/осень/зима", "Мультисезон,Осень",
    ],
    "Весна/Осень": ["Осенне-весенний", "Весна/осень", "Весна, осень",],
    "Осень/Зима": ["Осенне-зимний", ],
  }

  GROUP = {
    clothes: [
      "Колготки", "Платья", "Майки", "Юбки", "Футболки", "Капри", "Спортивные штаны",
      "Леггинсы", "Батники", "Кардиганы", "Куртки", "Спортивные костюмы", "Топы",
      "Шорты", "Костюмы", "Свитера", "Джинсы", "Рубашки",
      "Нижнее белье", "Блузы", "Комбинезоны", "Купальники", "Брюки", "Пальто",
      "Жилетки", "Толстовки", "Кофты", "Пиджаки", "Комплекты", "Водолазки",
      "Лонгсливы", "Свитшоты", "Туники", "Белье", "Худи", "Бомбер",
      "Верхняя одежда", "Пижама", "Водолазка", "Боди", "Лосины", "Шапки",
      "Поло", "Пуловер", "Вязаный", "Плащи",
    ],
    footwear: [
      "Угги", "Ботинки", "Сникеры", "Сапоги", "Туфли",
      "Кеды", "Кроссовки", "Эспадрильи", "Слипоны", "Мокасины", "Балетки",
      "Босоножки", "Сабо",
    ],
    accessories: [
      "Кошельки",  "Перчатки",  "Кепки", "Шарфы, хомуты",
      "Сумки", "Очки", "Бабочка", "Рюкзак", "Галстук",
      "Разное",
    ]
  }
  DROP_SHIPPER = [
    "Issaplus", "Tos", "Ager", "Villomi", "Garne", "Favoritti", "Olla"
  ]

  SYNONIM_NAMES_CATEGORIES = {
    "Белье": ["Белье", "Женские ночные рубашки", ],
    "Топы": ["Женские топы",  "Топы", ],
    "Галстук": ["Бабочка", "Галстук",],
    "Разное": [
      "Визитница", "Подтяжки", "Аксессуары", "Картхолдер", "Клатч", "Ключница", "Чехол-конверт",
      "Повязка", "Унисекс", "Ремень",
    ],
    "Капри": ["Капри", "Женские бриджи", ],
    "Кроссовки": ["Кроссовки", "Сникерсы", ],
    "Лосины": ["Лосины", "Спортивные лосины", "Женские спортивные лосины", ],
    "Лонгсливы": ["Лонгсливы", "Лонгслив", ],
    "Джинсы": ["Джеггинсы", "Джегинсы", "Джинсы", "Женские джеггинсы", ],
    "Пальто": [ "Пальто", "Полупальто",],
    "Бомбер": ["Бомбер",  "БОМБЕР", ],
    "Балетки": ["Балетки", "Белетки", ],
    "Плащи": ["Плащи", "Плащ", "Плащ-дождевик", ],
    "Сапоги": ["Сапоги", "Ботфорты", "Ботильены", "Ботильоны", "Полусапоги", "Полусапожки", "Сапоги-чулки", ],
    "Леггинсы": [ "Женские леггинсы", "Леггинсы классические", "Леггинсы", ],
    "Очки": ["Очки", "Солнцезащитные очки", ],
    "Кошельки": ["Кошельки", "Кошелек", "Зажим для денег", "Портмоне", ],
    "Майки": ["Майка", "Майки"],
    "Шапки": ["Женские шапки", "Шапка", "Шапки", "Мужские шляпы", "Мужские шапки", ],
    "Солнцезащитные очки": [ "Солнцезащитные очки", "Аксессуары",],
    "Туники": ["Туники", "Туника", "Жакеты", ],
    "Водолазки": ["Водолазка", "Водолазки", ],
    "Носки": ["Носки", "Женские носки", "Мужские носки", ],
    "Сабо": ["Сабо", "Сабо/клоги"],
    "Спортивные костюмы": [
      "Спорт",
      "Спортивный костюм", "Спортивные",
      "Спортивные костюмы", "Спортивная одежда",
    ],
    "Ботинки": ["Казаки", "Ботинки", ],
    "Рубашки": ["Рубашка", "Рубашки", "Рубашка-обманка", ],
    "Сумки": ["Сумки", "Сумка",],
    "Блузы": ["Блузы", "Блузки, рубашки", "Блузка", "Блуза", "Блузон", ],
    "Нижнее белье": ["Трусы", "Нижнее белье", "Домашняя одежда", ],
    "Верхняя одежда": [
       "Кардиганы", "Кардиган", "Мантия", "Шуба", "Шубы", "Шубка", "Дубленка",
     ],
    "Футболки": ["Футболки", "Футболка",],
    "Шарфы, хомуты": ["Шарф", "Шарфы, хомуты",],
    "Кепки": ["Кепка", "Кепки",],
    "Перчатки": ["Перчатки", "Мужские перчатки", "Женские перчатки", ],
    "Свитера": ["Свитера",  "Свитер", "Джемпер", ],
    "Платья": ["Платья", "Платье",],
    "Батники": ["Батники", "Батник",],
    "Комбинезоны": ["Комбинезоны", "Комбинезон",],
    "Юбки": ["Юбки", "Юбка",],
    "Жилеты": ["Жилетки", "Жилет", "Жилеты", ],
    "Куртки": [
      "Куртка-жакет", "Куртки", "Куртка", "Ветровка", "Анорак", "Женские ветровки", "Женские демисезонные куртки",
      "Женские кожаные куртки", "Мужские куртки", "Тренч", "Пуховики", "Пуховик", "Парка", "Женские зимние куртки",
    ],
    #"Шуба": ["Шуба",  "Шубка", "Дубленка", ],
    "Пиджаки": ["Пиджаки", "Пиджак",],
    "Костюмы": ["Костюмы", "Костюм", ],
    "Кофты": ["Кофты", "Кофта", "Пусер", "Кофта-топ", "Женские болеро", ],
    "Свитшоты": ["Свитшоты", "Свитшот",],
    "Толстовки": ["Толстовки", "Толстовка",],
    "Босоножки": ["Шлепанцы", "Женские комнатные тапочки", "Босоножки", "Женские вьетнамки, сланцы", "Тапочки", "Вьетнамки",],
  }

  def self.update_size_same_items
    update_size_same_names
    #update_size_same_prices
  end

  def self.update_size_same_names
    names = Item.select('items.name').group('items.name').having('count(items.name) > 1').map(&:name)
    names.map do |name|
      colors = Item.where(name: name).select(:color).map(&:color).uniq&.flatten&.flatten
      colors.each do |color|
        sizes = Item.where(name: name, color: color).map(&:size).flatten.uniq
        #pictures = Item.where(name: name, color: color).map(&:picture).flatten.compact.uniq
        first_item = Item.where(name: name, color: color).first
        first_item.update(size: sizes)
        Item.where.not(id: first_item.id).where(name: name, color: color).map(&:delete)
      end
    end
  end

  def self.update_size_same_prices
    drop_shippers = Item.select(:drop_ship).map(&:drop_ship).uniq&.flatten&.flatten
    drop_shippers.each do |drop_ship|
    use_items = Item.where(drop_ship: drop_ship)
    categories = use_items.select(:category).map(&:category).uniq&.flatten&.flatten
    categories.each do |category|
      prices = use_items.where(category: category).select('items.drop_ship_price').group('items.drop_ship_price').having('count(items.drop_ship_price) > 1').map(&:drop_ship_price)
      prices.map do |drop_ship_price|
        items = use_items.where(drop_ship_price: drop_ship_price, category: category)
        colors = items.select(:color).map(&:color).uniq&.flatten&.flatten
        colors.each do |color|
          sizes = use_items.where(drop_ship_price: drop_ship_price, color: color, category: category).map(&:size).flatten.uniq
          #pictures = Item.where(drop_ship_price: drop_ship_price, color: color, category: category).map(&:picture).flatten.compact.uniq
          first_item = use_items.where(drop_ship_price: drop_ship_price, color: color, category: category).first
          if first_item
            first_item.update(size: sizes)
            use_items.where.not(id: first_item.id).where(drop_ship_price: drop_ship_price, color: color, category: category).map(&:delete)
          end
        end
      end
    end
    end
  end

  def self.delete_same_slug_ids
    not_uniq_slug_ids = select('items.slug_id').group('items.slug_id').having('count(items.slug_id) >1').all
    where(slug_id: not_uniq_slug_ids).delete_all
  end

  def self.delete_bad_products
    Item.where(name: Item::BAD_PRODUCTS_NAME).delete_all
    Item.where(name: Item::BAD_SLUG_IDS).delete_all
    Item.where(category: Item::BAD_CATEGORIES).delete_all
  end

  def self.generate_filters(all_items, search_category={})
    items = search_category.present? ? all_items.where(category: search_category) : all_items
    prices = items.map { |item| item.price }
    seasons = items.map(&:season)&.flatten&.compact&.uniq
    {
      size: items.map { |item| item.size }.flatten.uniq,
      price_min: prices.min,
      price_max: prices.max,
      brand: items.map { |item| item.brand }&.compact&.uniq,
      season: seasons,
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
    wooman_catalogues = Item.where('sex && ARRAY[?]::varchar[]', "wooman").select(:category).map(&:category).compact.uniq
    wooman_catalogues.map do |catalogue|
      count = Item.where(category: catalogue).count
      group = GROUP.select{ |key, hash| hash.include?(catalogue&.capitalize) }.keys[0].to_s
      Header.create!(count_items: count, catalogue: catalogue, group: group, male: false)
    end
    man_catalogues = Item.where('sex && ARRAY[?]::varchar[]', "man").select(:category).map(&:category).compact.uniq
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
