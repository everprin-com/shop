Rails application online store, demo:
http://
lounch install
bundler 1.9.0
ruby 2.5.1
rails version 4.2.11

root@178.62.6.75
ssh rails-demo@178.62.6.75
cd app
cd current
RAILS_ENV=production bundle exec rails c
RAILS_ENV=production bundle exec rspec spec/models/item_spec.rb --format html --out app/views/test_html/rspec_results.html
tail -f ~/app/shared/log/*
node --max_old_space_size=1096 node_modules/webpack/.bin/webpack.js
RAILS_ENV=production bundle exec rake create_fid:create_fid

RAILS_ENV=production bundle exec rake create_votes:create_votes
RAILS_ENV=production bundle exec rake create_comments:create_comments

scp rails-demo@178.62.6.75:/home/rails-demo/app/current/public/converted_fid.xls /home/oleg/work/bizness


rubocop
lounch lint
./bin/webpack-dev-server
eslint app/assets

RAILS - 5
  bundle update
  bundle update rails


update ruby gems
- gem update --system

install posgres
http://rubycode.ru/ruby-on-rails/69-kak-ustanovit-postgresql-na-rails.html
SELECT indexname, indexdef from pg_indexes where tablename='items';\

Question
id: TeleNotify::TelegramUser.find(1)
Order telegram
id: TeleNotify::TelegramUser.find(2)
1) #<TeleNotify::TelegramUser id: 1, telegram_id: -363760774, first_name: "newtrex", username: "newtrex_bot", created_at: "2019-05-09 20:53:20", updated_at: "2019-05-09 20:53:20">
2) => #<TeleNotify::TelegramUser id: 2, telegram_id: -374400962, first_name: "newtrex", username: "newtrex_bot", created_at: "2019-05-09 21:06:13", updated_at: "2019-05-09 21:06:13">

https://convertio.co/ru/csv-xls/
parse issaplus insert url
https://issaplus.com/load/csv3.php
https://issaplus.com/load/xml.php

XLS_LINK = [
  "http://timeofstyle.com/download/tos_actual_price_and_stock.xls",
  "https://ager.ua/download/ager_actual_price_and_stock.xls",
  "https://garne.com.ua/files/garne_prices_clothes.xlsx",
  "https://favoritti.com/upload/favoritti_com_export_csv_opt.xlsx",
]

Parser
валидация по полям name, price, picture
Расположение по порядку
1 (A) :article, null: false
2 (B) :name, null: false
3 (C) :description
4 (D) :price, null: false
5 (E) :color
6 (F) :picture, null: false
7 (G) :brand
8 (H) :season, null: false
зима - 1, весна - 2, лето - 3, осень - 4
9 (I) :male, array man: man, wooman-wooman
10 (J) :size
11 (K) :country
12 (L) :category
13 (M) :presence, default: true
14 (N) :size_world
15 (O) :drop_ship, null: false
16 (P) :composition
17) (Q) drop_ship_price - оригинальная цена

#posgres superusr
Thank's @devton your tip solved my problem.
I just made the log in postgres and do this comands:
postgres=# \du # to list all users
postgres=# ALTER ROLE user CREATEROLE SUPERUSER;
ALTER ROLE # this was the result

PARSER XLS
bundle exec rake parser_excel:parser_excel
PARSER XML
bundle exec rake parser_xml:parser_xml

Site map generator
rake sitemap:generate
bundle exec rake create_yml:create_yml


autoparser
      "http://timeofstyle.com/download/tos_actual_price_and_stock.xls",
      "https://ager.ua/download/ager_actual_price_and_stock.xls",
      "https://garne.com.ua/files/garne_prices_clothes.xlsx",

hand-convert to csv        
      "https://issaplus.com/load/csv3.php"

CONVERT EXCEL
1) ложим в папку файлы public/excel/origin "xls"
2)  bundle exec rake convert_excel:convert_excel
3)  получаем в папке public/excel/converted/

server

sudo chmod -R 777 '/home/rails-demo/app/current/node_modules'
