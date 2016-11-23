Rails.application.routes.draw do

  resources :messages, :news
  resources :sites, except: [:show, :new]
  kinds = %w|blog single_page other online_store corporative forum|
  

  resources :sites do
    collection do
      get 'sites/:kind' => 'sites#order', as: :order, constraints: {kind: Regexp.new(kinds.join('|'))}
    end 
  end  
  #mount Ckeditor::Engine => '/ckeditor'
  #get 'rss' => 'rss#feed', format: 'rss' 
  #get 'sitemap' => 'home#sitemap'
  get 'googlebeb55c28782e7ab9' => 'home#google', format: :html
  get "sitemap" => "rss#sitemap", format: :xml, as: :sitemap
  get "robots" => "rss#robots", format: :text, as: :robots

  
  namespace :admin do
    resources  :admins, only: [:index] 
    resource :configurable
    #get "configurable/edit", as: "admin_configurable_edit"
    #resources  :clients
    #resources  :tasks
  end
  
  get 'admins/index'
    


  resources :messagestoadministrators, :answerfrommoderators
  resources :users, only: [:index]

  
  home_pages=%w[activate about contact all_film solutions technologies]  
  get 'home/:contr' => 'home#page', as: :page, constraints: {contr: Regexp.new(home_pages.join('|'))}     
  
  get "info_show_from_email/:user_id" => "infos#show_from_email", :as => "user_show"
  get "info_show_from_navbar/:user_id" => "infos#show_from_navbar", :as => "user_show_navbar"
  get '/ban_the_user/:id' => 'admin/admins#ban_the_user', :as => 'ban'
  get '/make_admin/:id' => 'admin/admins#make_admin', :as => 'make_admin'
  get '/user_delete/:id' => 'admin/admins#delete_user', as: "delete_user"
  
 
 
  

  devise_for :users#, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # devise_for :users, controllers: {
    # sessions: 'auth/sessions',
    #registrations: 'auth/registrations',
  #}
  get '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

  #devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

 
  resources :infos do
    collection do
      get "message" => "infos#message"
      get "order" => "infos#order"
      get "receive" => "infos#receive"
    end
  end

  root 'home#all_film'

end
