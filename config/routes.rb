Rails.application.routes.draw do
  get 'items_imports/new'

  get 'items_imports/create'

  kinds = %w[search laptop car mobile]

  resources :products do
    collection do
      get '/:kind' => 'products#order', as: :order, constraints: { kind: Regexp.new(kinds.join('|')) }
    end
    resources :comments, module: :products do
    end
  end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  put 'voices/:increase_id' => 'voices#increase', :as => 'voices_increase'
  put 'voices/:decrease_id' => 'voices#decrease', :as => 'voices_decrease'

  namespace :admin do
    resources :admins, only: [:index] do
      collection do
        post 'delete_drop_ship' => 'admins#delete_drop_ship'
      end
    end
    get 'configurable/edit', as: 'admin_configurable_edit'
    resources  :clients
    resources  :tasks
  end

  resources :items
  resources :items_imports, only: [:new, :create]
  resources :meta_datas, only: [:index]
  resources :infos, :messagestoadministrators, :answerfrommoderators, :orders, :line_items, :carts

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
end
