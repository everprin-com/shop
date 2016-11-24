Rails.application.routes.draw do


  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  put "voices/:increase_id" => "voices#increase", :as => "voices_increase"
  put "voices/:decrease_id" => "voices#decrease", :as => "voices_decrease"

  namespace :admin do
    resources  :admins, only: [:index] 
    #get "configurable/edit", as: "admin_configurable_edit"
    #resources  :clients
    #resources  :tasks
  end
  

#get "search" => "products#search"

resources :infos, :messagestoadministrators, :answerfrommoderators, :orders, :line_items, :carts
  
 resources :searches do 
    collection do
      post "product" => "searches#search_product"
    end
  end

  
  get 'home/index'
  get 'store/map'
  get 'store/index'
  get 'store/all_category'
  get 'store/show'
  get 'store/contact'
  get 'line/increase',to: 'line_items#increase', as: :increase_line_item
  get 'line/decrease',to: 'line_items#decrease', as: :decrease_line_item
  get 'store/showlike'
  get '/change_locale/:locale', to: 'pages#change_locale', as: :change_locale
  


  resources :products do 
    collection do
      get "search" => "products#search"
      get "telephone" => "products#telephone"
      get "laptop" => "products#laptop"
      get "car" => "products#car"
    end
      resources :comments, module: :products do
    end
  end  
  
  
   
 



  get '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

 



  #post 'pages/upload' 

  
  get "info_show_from_email/:user_id" => "infos#show_from_email", :as => "user_show"
  get "info_show_from_navbar/:user_id" => "infos#show_from_navbar", :as => "user_show_navbar"
  get '/ban_the_user/:id' => 'admin/admins#ban_the_user', :as => 'ban'
  get '/make_admin/:id' => 'admin/admins#make_admin', :as => 'make_admin'
  delete 'user_delete/:id' => 'admin/admins#delete_user', as: "delete_user"



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  
  root 'store#index'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
