class Item < ActiveRecord::Base
  DEFAULT_PAGE = 16
  extend FriendlyId
  friendly_id :article, use: :slugged
  #include ActiveModel::Serialization
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

  GROUP = {
    clothes: [
      "Колготки", "Платья", "Майки", "Юбки", "Футболки", "Капри", "Спортивные штаны",
      "Леггинсы", "Батники", "Кардиганы", "Куртки", "Спортивные костюмы", "Топы",
      "Шорты", "Костюмы",  "Свитера",  "Джинсы", "Рубашки", "Домашняя одежда",
      "Нижнее белье", "Блузы", "Комбинезоны", "Купальники", "Брюки", "Пальто",
      "Жилетки", "Толстовки", "Кофты", "Пиджаки", "Спортивная одежда", "Комплекты",
      "Лонгсливы", "Свитшоты"
    ],
    footwear: [
      "Угги", "Ботинки", "Боди", "Туники", "Сникеры", "Сапоги", "Туфли",
      "Кеды", "Кроссовки", "Эспадрильи", "Слипоны", "Мокасины", "Балетки",
      "Босоножки", "Тапочки", "Вьетнамки"
    ],
    accessories: [
      "Кошельки", "Мужские шляпы", "Мужские перчатки", "Мужские шапки", "Шляпы", "Кепки",
      "Шарфы, хомуты", "Женские шапки", "Женские перчатки", "Сумки",
      "Солнцезащитные очки", "Детские шапки", "Детские платья", "Детские перчатки и варежки"
    ]
  }

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
