class Item < ActiveRecord::Base
  DEFAULT_PAGE = 16
  has_one :average_voted, foreign_key: "slug_id", primary_key: "slug_id"
  has_many :product_comments, foreign_key: "slug_id", primary_key: "slug_id"

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
    "Для девочек", "Для мальчиков", "Мужская одежда", "Замшевые", "Шляпы", "Митенки", "Носки",
    "Детская одежда", "Детские платья", "Детская обувь", "Лоферы", "Стильный", "Женский",
  ]

  BAD_SLUG_IDS = [
    "botinki_zimnie_na_kabluke_chernyj", "noski_zhenskie_21p011_1_sine_belyj_sine_belyj",
    "zhenskie_chernye_zamshewye_lofery_chernyj", "rubashka_113rom92_kirpichnyj_kirpichnyj",
    "rubashka_zeg_113r197_belo_salatowyj_belo_salatowyj", "rubashka_113r002_goluboj_goluboj",
    "rubashka_113rom97_persikowyj_persikowyj", "dzhinsy_zhenskie_358kg001_junior_chernyj"
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
      "Поло", "Пуловер", "Вязаный", "Плащи", "Сарафаны",
    ],
    footwear: [
      "Уги", "Ботинки", "Сникеры", "Сапоги", "Туфли",
      "Кеды", "Кроссовки", "Эспадрильи", "Слипоны", "Мокасины", "Балетки",
      "Босоножки", "Тапочки",
    ],
    accessories: [
      "Кошельки",  "Перчатки",  "Кепки", "Шарфы",
      "Сумки", "Очки", "Бабочка", "Рюкзак", "Галстук",
      "Разное",
    ]
  }

  DROP_SHIPPER = [
    "Favoritti", "Tos", "Ager", "Garne", "Villomi", "Issaplus", "Modus"
  ]

  XLS_DROP_SHIPPER = [
    "Favoritti", "Tos", "Ager", "Garne"
  ]

  XML_DROP_SHIPPER = [
    "Villomi", "Issaplus", "Modus"
  ]

  SYNONIM_NAMES_CATEGORIES = {
    "Слипоны": ["Женские слипоны", "Слипоны", ],
    "Белье": ["Белье", "Женские ночные рубашки", ],
    "Топы": ["Женские топы",  "Топы", ],
    "Галстук": ["Бабочка", "Галстук",],
    "Разное": [
      "Визитница", "Подтяжки", "Аксессуары", "Картхолдер", "Клатч", "Ключница", "Чехол-конверт",
      "Повязка", "Унисекс", "Ремень",
    ],
    "Сарафаны": ["Сарафаны", "Женские сарафаны", ],
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
    "Кардиганы": ["Кардиганы", "Кардиган", ],
    "Шуба": ["Шуба", "Шубы", "Шубка", "Полушубок",],
    "Верхняя одежда": [
       "Мантия",  "Дубленка",
     ],
    "Футболки": ["Футболки", "Футболка",],
    "Шарфы": ["Шарф", "Шарфы, хомуты", "Шарфы", ],
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
    "Пиджаки": ["Пиджаки", "Пиджак",],
    "Костюмы": ["Костюмы", "Костюм", ],
    "Кофты": ["Кофты", "Кофта", "Пусер", "Кофта-топ", "Женские болеро", ],
    "Свитшоты": ["Свитшоты", "Свитшот",],
    "Толстовки": ["Толстовки", "Толстовка",],
    "Босоножки": ["Босоножки", "Сабо", "Сабо/клоги", ],
    "Тапочки": ["Шлепанцы", "Женские комнатные тапочки", "Женские вьетнамки, сланцы", "Тапочки", "Вьетнамки",],
  }

  def self.check_parsed_drop(drop_shipers)
    drop_shipers.map do |drop_ship|
      created_last_item_day =  Item.where(available_product: "t", drop_ship: drop_ship).last&.created_at&.day
      if !created_last_item_day || Time.now.day - created_last_item_day != 0
        broken_drop_ship = { drop_ship: drop_ship, text: "was broken" }
        TeleNotify::TelegramUser.find_by_tg_channel("question").send_message(broken_drop_ship.to_json)
      end
    end
  end

  def self.check_all_parsed_drop
    drop_shipers = Item::DROP_SHIPPER
    brocken_drop_shiper = []
    drop_shipers.map do |drop_ship|
      created_last_item_day =  Item.where(available_product: "t", drop_ship: drop_ship).last&.created_at&.day
      if !created_last_item_day || Time.now.day - created_last_item_day != 0
        brocken_drop_shiper.push(drop_ship)
      end
    end
    brocken_drop_shiper
  end

  def self.update_size_same_items(drop_shipers)
    items =  Item.where.not(drop_ship: ["Garne", "Favoritti"]).where(available_product: "t", drop_ship: drop_shipers)
    # group by slug_id
    slug_ids = items.select('items.slug_id').group('items.slug_id').having('count(items.slug_id) > 1').map(&:slug_id)
    slug_ids.map do |slug_id|
      sizes = items.where(slug_id: slug_id).map(&:size).flatten.uniq
      first_item = Item.where(slug_id: slug_id).first
      first_item.update(size: sizes)
      items.where.not(id: first_item.id).where(slug_id: slug_id).map(&:delete)
    end

    # group by name and size
    # names = items.select('items.name').group('items.name').having('count(items.name) > 1').map(&:name)
    # names.map do |name|
    #   colors = items.where(name: name).select(:color).map(&:color).uniq&.flatten&.flatten
    #   colors.each do |color|
    #     sizes = items.where(name: name, color: color).map(&:size).flatten.uniq
    #     #pictures = Item.where(name: name, color: color).map(&:picture).flatten.compact.uniq
    #     first_item = Item.where(name: name, color: color).first
    #     first_item.update(size: sizes)
    #     items.where.not(id: first_item.id).where(name: name, color: color).map(&:delete)
    #   end
    # end
  end

  # def self.delete_same_slug_ids
  #   not_uniq_slug_ids = select('items.slug_id').group('items.slug_id').having('count(items.slug_id) >1').all
  #   where(slug_id: not_uniq_slug_ids).delete_all
  # end

  def self.delete_bad_products
    Item.where(name: Item::BAD_PRODUCTS_NAME).delete_all
    Item.where(slug_id: Item::BAD_SLUG_IDS).delete_all
    Item.where(category: Item::BAD_CATEGORIES).delete_all
  end

  def self.generate_filters(all_items, search_category={})
    items = search_category.present? ? all_items.where(category: search_category) : all_items
    # items = all_items
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

  # def make_unvaliable_old_item
  #   NormalizerParse.make_unvaliable_old_item(self)
  # end

  def self.create_header
    Header.delete_all
    wooman_catalogues = Item.where('sex && ARRAY[?]::varchar[]', "wooman").where(available_product: "t").select(:category).map(&:category).compact.uniq
    wooman_catalogues.map do |catalogue|
      count = Item.where(category: catalogue).count
      group = GROUP.select{ |key, hash| hash.include?(catalogue&.capitalize) }.keys[0].to_s
      Header.create!(count_items: count, catalogue: catalogue, group: group, male: false)
    end
    man_catalogues = Item.where('sex && ARRAY[?]::varchar[]', "man").where(available_product: "t").select(:category).map(&:category).compact.uniq
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
