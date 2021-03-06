Rails.application.routes.draw do
  get 'items_imports/new'

  get 'items_imports/create'

  kinds = %w[search laptop car mobile]

  resources :products do
    collection do
      get '/:kind' => 'products#order', as: :order, constraints: { kind: Regexp.new(kinds.join('|')) }
    end
    #resources :comments, module: :products do
    #end
  end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  put 'voices/:increase_id' => 'voices#increase', :as => 'voices_increase'
  put 'voices/:decrease_id' => 'voices#decrease', :as => 'voices_decrease'

  namespace :admin do
    resources :admins, only: [:index] do
      collection do
        post 'delete_drop_ship' => 'admins#delete_drop_ship'
        get 'upload_xls' => 'admins#upload_xls'
        get 'show_test' => 'admins#show_test'
        get 'lounch_test' => 'admins#lounch_test'
        get 'upload_xml' => 'admins#upload_xml'
        get 'convert_xls_to_db' => 'admins#convert_xls_to_db'
        get 'convert_xml_to_db' => 'admins#convert_xml_to_db'
      end
    end
    get 'configurable/edit', as: 'admin_configurable_edit'
    #resources  :clients
    #resources  :tasks
  end

  resources :items
  resources :product_comments, defaults: {format: 'json'}, only: [:index, :create]
  resources :items_imports, only: [:new, :create]
  resources :meta_datas, defaults: {format: 'json'}#, only: [:index]
  resources :infos, :messagestoadministrators, :answerfrommoderators, :line_items, :carts
  resources :orders, defaults: {format: 'json'}
  resources :questionnaires, defaults: {format: 'json'}, only: [:index, :create]
  #post '/852875250:AAEMa_qRzOs4LdRDvgOWJYOIBpcIy_zM9vs' => 'application#webhook'
  # get '/message' => 'some#message'
  # post '/send_message_to_all' => 'some#send_message_to_all'

  resources :searches do
    collection do
      post 'product' => 'searches#search_product'
    end
  end

  get '*path', to: 'store#index'

  get 'home/index'

  get 'store/map'
  get 'store/index'
  get 'store/all_category'
  get 'store/show'
  get 'store/contact'

  get 'line/increase', to: 'line_items#increase', as: :increase_line_item
  get 'line/decrease', to: 'line_items#decrease', as: :decrease_line_item
  # get 'store/showlike'
  get '/change_locale/:locale', to: 'pages#change_locale', as: :change_locale


  get '/users/:id/finish_signup' => 'users#finish_signup', via: %i[get patch], :as => :finish_signup
  get 'info_show_from_email/:user_id' => 'infos#show_from_email', :as => 'user_show'
  get 'info_show_from_navbar/:user_id' => 'infos#show_from_navbar', :as => 'user_show_navbar'
  get '/ban_the_user/:id' => 'admin/admins#ban_the_user', :as => 'ban'
  get '/make_admin/:id' => 'admin/admins#make_admin', :as => 'make_admin'

  delete 'user_delete/:id' => 'admin/admins#delete_user', as: 'delete_user'

  root 'store#index'
  get 'sitemap' => 'store#sitemap'
end
