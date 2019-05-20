Rails application online store, demo:
http://
lounch install
bundler 1.9.0
ruby 2.5.1
rails version 4.2.11


rubocop

lounch lint
./bin/webpack-dev-server
eslint app/assets


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
9 (I) :male, boolean man: true, wooman-false
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


server

sudo chmod -R 777 '/home/rails-demo/app/current/node_modules'
