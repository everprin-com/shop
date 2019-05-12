const category = [
"Новинки"
,"Блузы и рубашки"
,"Боди"
,"Брюки"
,"Верхняя одежда" 
,"Джемперы свитеры и кардиганы" 
,"Джинсы"
,"Домашняя одежда" 
,"Комбинезоны"
,"Купальники и пляжная одежда" 
,"Нижнее белье" 
,"Носки чулки и колготки"
,"Блузы и рубашки"
,"Боди"
,"Брюки"
,"Верхняя одежда" 
,"Джемперы свитеры и кардиганы" 
,"Джинсы"
,"Домашняя одежда" 
,"Комбинезоны"
,"Купальники и пляжная одежда" 
,"Нижнее белье" 
,"Носки чулки и колготки"  
]

const title = [
"Анораки"
,"Бомберы"
,"Горнолыжные"
,"Демисезонные"
,"Джинсовые"
,"Жилеты"
,"Кожаные"
,"Косухи"
,"Легкие"
,"Пальто"
,"Парки"
,"Плащи"
,"Пончо"
,"Пуховики"
,"Анораки"
,"Бомберы"
,"Горнолыжные"
,"Демисезонные"
,"Джинсовые"
,"Жилеты"
,"Кожаные"
,"Косухи"
,"Легкие"
,"Пальто"
,"Парки"
,"Плащи"
,"Пончо"
,"Пуховики"
]

  const brand = [
    "Calvin Klein",
    "Zara",
    "Dolce & Gabbana",
    "Giorgio Armani",
    "Dior",
    "Prada",
    "Versace",
    "Chanel",
    "Burberry",
    "Gucci",
    "Louis Vuitton",
    "NAF-NAF",
    "Guess",
    "Lacoste",
    "Morgan",
    "Reserved",
    "Alexander McQween",
    "H&M",
    "Zara",
    "OGGI",
    "Mango",
    "Sela",
    "Colin’s",
    "Topshop",
    "Chloe",
    "Columbia",
    "Givenchy",
    "Kenzo",
    "Kira Plastinina",
    "Mexx",
    "Miu Miu",
    "Monica Ricci",
    "New Look",
  ]
  const season = [
      "Лето",
      "Зима",
      "Осень",
      "Весна"
  ]

  const composition = [
     "ацетатное волокно"
     ,"волокно из пеньки, конопли"
     ,"хлопок"
     ,"медно-аммиачное волокно"
     ,"другие волокна"
     ,"эластан"
     ,"щетина, волосяная нить,ворс"
     ,"лен с примесями, полульняное волокно"
     ,"лен"
     ,"лайкра"
     ,"модифицированный акрил"
     ,"модифицированное вискозное волокно"
     ,"нейлон, полиамид"
     ,"металлизированная нить"
     ,"акрил"
     ,"полиэстерное, полиэфирное волокно"
     ,"полиэтиленовое волокно"
  ]

    const color = [
        "Абрикосовый",
        "Абрикосовый Крайола",
        "Агатовый серый",
        "Азур",
        "Айвори",
        "Аква",
        "Аквамариновый",
        "Аквамариновый Крайола",
        "Ализариновый красный",
        "Алый",
        "Амарантово-пурпурный",
        "Амарантово-розовый",
        "Амарантовый",
        "Амарантовый глубоко-пурпурный",
        "Амарантовый маджента",
        "Амарантовый светло-вишневый",
        "Американская роза",
        "Американский розовый",
        "Аметистовый",
        "Анилиновый пурпур",
        "Античная латунь",
        "Античный белый",
        "Антрацитово-серый",
        "Антрацитовый",
        "Арлекин",
        "Армейский зелёный",
        "Аспидно-серый",
        "Аспидно-синий",
        "Бабушкины яблоки",
        "Базальтово-серый"
    ]
    const brandCountry = [ 
        "Австралия", 
        "Австрия", 
        "Азербайджан",
        "Албания", 
        "Алжир", 
        "Ангола",
        "Андорра", 
        "Антигуа", 
        "Аргентина", 
        "Армения",
        "Афганистан", 
        "Багамские", 
        "Бангладеш", 
        "Барбадо",
        "Бахрейн",
        "Белоруссия", 
        "Белиз", 
        "Бельгия",
        "Бенин", 
        "Болгария", 
        "Боливия",
        "Босния", 
        "Ботсвана", 
        "Бразилия",
        "Бруней",
    ]
    const description = [
         "Columbia  •  Ветровка Columbia 1533891-318 M Cypress (0191455753495)"
         ,"Columbia  •  Ветровка Columbia 1533891-806 L Super Sonic (0191455753532)"
         ,"Columbia  •  Ветровка Columbia Western Barlow II Jacket 1846861-483 XL Синяя (0192290062278)"
         ,"Jack Wolfskin  •  Ветровка Jack Wolfskin Stormy Point Jacket M 1111141-1010 XXL (4060477152509)"
         ,"Nike  •  Куртка Nike M Nsw Syn Fill Bombr Gx AJ1020-010 S (887232863043)"
         ,"beZet  •  Анорак beZet Pride 0341 XS Серый (ROZ6205086107)"
         ,"Levi's  •  Ветровка Levi's Baracuda Jacket S Nightwatch Blue (39978-0000)"
         ,"MR520  •  Джинсовая куртка MR520 MR 102 1660 0219 L Blue (2000099784919)"
         ,"Tom Tailor  •  Куртка Tom Tailor TT 35553090010 6000 XL Серая (4062105304656)"
         ,"Champion  •  Куртка Champion 212258 M Темно-зеленая (8052785902125)"
         ,"Colin's  •  Куртка из искусственной кожи Colin’s CLTWNMMNT026617019-4013 M (8680325023841)"
         ,"Diesel  •  Кожаная куртка Diesel L-Ingran Giacca 00SIFV/0DATV/900 L Черная (8053837338541)"
         ,"Riccardo  •  Бомбер Riccardo Б3 S (46) Темно-серый (ROZ6205064544)"
         ,"Colin's  •  Ветровка Colin’s CL1032458BLK L (8681597307769)"
         ,"Colin's  •  Куртка Colin’s CL1032686NAV L (8681597318345)"
         ,"Kariant  •  Куртка Kariant Itan 52 Синяя (54324198)"
         ,"Riccardo  •  Куртка Riccardo Т4 M (48) Черная (ROZ6205064510)"
         ,"Riccardo  •  Куртка Riccardo Т5 L (50) Светло-серая (ROZ6205064516)"
         ,"Piazza Italia  •  Куртка Piazza Italia 13250-62 L Blue (2013250001053)"
         ,"Puma  •  Пуховик Puma 85162115 XL Зеленый (4059506772610)"
         ,"Colin's  •  Джинсовая куртка Colin’s CL1005392DN03888 L (8680593090989)"
         ,"Riccardo  •  Куртка Riccardo М4 L (50) Сине-зеленая (ROZ6205064617)"
         ,"Riccardo  •  Бомбер Riccardo Б1 L (50) Черный (ROZ6205064566)"
    ]

const imgs = ["//a.lmcdn.ru/img236x341/L/O/LO019EWCCQQ2_7453089_1_v1.jpg",
"//a.lmcdn.ru/img236x341/V/E/VE389EWDLXB7_8054226_1_v1.jpg", "//a.lmcdn.ru/img236x341/O/O/OO001EWWZV23_5289584_1_v1.jpg",
"//a.lmcdn.ru/img236x341/M/A/MA002EWDXWP9_7904881_1_v1.jpg", "//a.lmcdn.ru/img236x341/O/D/OD006EWCSDN4_7537357_1_v1.jpg",
"//a.lmcdn.ru/img236x341/V/E/VE389EWDLXB8_8054229_1_v1.jpg", "//a.lmcdn.ru/img236x341/M/A/MA002EWDQDH3_7796345_1_v1.jpg",
"//a.lmcdn.ru/img236x341/O/O/OO001EWCZBW4_7446099_1_v1.jpg", "//a.lmcdn.ru/img236x341/V/E/VE389EWDLWU5_7966785_1_v1.jpg",
"//a.lmcdn.ru/img236x341/J/A/JA908EWDNQI3_7980607_1_v1.jpg", "//a.lmcdn.ru/img236x341/M/P/MP002XW1IRT8_8283900_1_v1.jpeg",
"//a.lmcdn.ru/img236x341/M/P/MP002XW1H3U8_7492780_1_v1.jpeg", "//a.lmcdn.ru/img236x341/U/N/UN012EWCXAE1_7573129_1_v2.jpg",
"//a.lmcdn.ru/img236x341/M/P/MP002XW1GT5N_7286857_1_v2.jpeg", "//a.lmcdn.ru/img236x341/M/P/MP002XW1AKJ2_5397008_1_v1.jpeg",
"//a.lmcdn.ru/img236x341/M/P/MP002XW0Z6R5_8329087_1_v1.jpeg", "//a.lmcdn.ru/img236x341/B/E/BE031EWDUNC2_7855144_1_v1.jpg",
"//a.lmcdn.ru/img236x341/O/O/OO001EWMTX39_3886748_1_v3.jpg", "//a.lmcdn.ru/img236x341/M/A/MA002EWDODU5_7770758_1_v1.jpg",
"//a.lmcdn.ru/img236x341/V/E/VE389EWDLXB7_8054226_1_v1.jpg", "//a.lmcdn.ru/img236x341/O/O/OO001EWWZV23_5289584_1_v1.jpg",
"//a.lmcdn.ru/img236x341/M/A/MA002EWDXWP9_7904881_1_v1.jpg", "//a.lmcdn.ru/img236x341/O/D/OD006EWCSDN4_7537357_1_v1.jpg",
"//a.lmcdn.ru/img236x341/V/E/VE389EWDLXB8_8054229_1_v1.jpg", "//a.lmcdn.ru/img236x341/M/A/MA002EWDQDH3_7796345_1_v1.jpg",
"//a.lmcdn.ru/img236x341/O/O/OO001EWCZBW4_7446099_1_v1.jpg", "//a.lmcdn.ru/img236x341/V/E/VE389EWDLWU5_7966785_1_v1.jpg",
"//a.lmcdn.ru/img236x341/J/A/JA908EWDNQI3_7980607_1_v1.jpg", "//a.lmcdn.ru/img236x341/M/P/MP002XW1IRT8_8283900_1_v1.jpeg",
"//a.lmcdn.ru/img236x341/M/P/MP002XW1H3U8_7492780_1_v1.jpeg", "//a.lmcdn.ru/img236x341/U/N/UN012EWCXAE1_7573129_1_v2.jpg",
"//a.lmcdn.ru/img236x341/M/P/MP002XW1GT5N_7286857_1_v2.jpeg", "//a.lmcdn.ru/img236x341/M/P/MP002XW1AKJ2_5397008_1_v1.jpeg",
"//a.lmcdn.ru/img236x341/M/P/MP002XW0Z6R5_8329087_1_v1.jpeg", "//a.lmcdn.ru/img236x341/B/E/BE031EWDUNC2_7855144_1_v1.jpg",
"//a.lmcdn.ru/img236x341/S/I/SI386EWEKPC3_8138199_1_v2.jpg"]

const price = [
    543, 234, 563, 322, 534, 657,
    768, 789, 234, 567, 572, 347,
    456, 879, 432, 234, 324, 567,
    768, 345, 658, 385, 247, 278,
    478, 864, 345, 634, 654, 324,
    543, 234, 563, 322, 534, 657,
    768, 789, 234, 567, 572, 347,
    456, 879, 432, 234, 324, 567,
    768, 345, 658, 385, 247, 278,
    478, 864, 345, 634, 654, 324,
]

const random = (min, max) => Math.round((Math.random()*(max-min))+min)

const products = category.map((v,i)=>({ 
    id:i,
    sex: ( (i%2>0) ? "Мужчинам" : "Женщинам"),
    brand: brand[i],
    title: title[i],
    category: category[i],
    img: imgs[i],
    price: price[i],
    season: season[random(0,3)],
    composition: composition[i],
    color: color[i],
    brandCountry: brandCountry[i],
    weight: random(200,800),
    description: description[i],
    sizes: [...(new Array(random(2,7)))].map((v,i)=>(i+40)).sort(),
    activeSize: null,
 }))

export {
    category,
    title,
    imgs,
    price,
    products,
}