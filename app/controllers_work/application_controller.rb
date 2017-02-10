class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
  include CurrentCart
  before_action :set_cart
  before_action :create_search

  
  before_action :set_locale
  helper_method :user_present?
  helper_method :role?
  helper_method :current_blog
  include ApplicationHelper

  def set_locale
    if cookies[:educator_locale] && I18n.available_locales.include?(cookies[:educator_locale].to_sym)
      l = cookies[:educator_locale].to_sym
    else
      l = I18n.default_locale
      cookies.permanent[:educator_locale] = l
    end
    I18n.locale = l
  end
   
  def current_author_coment(comment)
    if current_user.present?  
      current_user.comments.each do |comm|
        return true if comment.id==comm.id
      end
      false
    else
      false
    end
  end  
  
  def save_title(title)
    title.chomp.titleize
  end
  
  def ensure_signup_complete
    # Ensure we don't go into an infinite loop
    return if action_name == 'finish_signup'

    # Redirect to the 'finish_signup' page if the user
    # email hasn't been verified yet
    if current_user && !current_user.email_verified?
      redirect_to finish_signup_path(current_user)
    end
  end
   
  def respond_modal_with(*args, &blk)
    options = args.extract_options!
    options[:responder] = ModalResponder
    respond_with *args, options, &blk
  end
  
 # rescue_from Cinema::NotFound do
   # render_404
 # end

  #rescue_from Cinema::InvalidAccess do
  #  render_404
#  end

  #rescue_from Cinema::ReadOnly do
   # render_404
 # end

  def user_present?
    current_user.present?
  end
  
  def role?(role)
    if current_user.role==role.to_s
      return true
    else
      return false
    end  
  end

  def create_search
    #@product=Product.first
    @search = Search.new
  end

  def render_404  
    respond_to do |format|  
      format.html { render :file => "#{Rails.root}/public/404.html", :status => '404 Not Found' }  
      format.xml  { render :nothing => true, :status => '404 Not Found' }  
    end  
    true  
  end
  
  def only_admin_or_moderator
    if current_user.present?
      (current_user.role=="admin") ? true : (redirect_to root_path)  
    else
      redirect_to root_path  
    end 
  end 

  def only_admin
    if current_user.present?
      current_user.admin==true ? true : (redirect_to root_path)  
    else
      redirect_to root_path  
    end 
  end 

  def guardian
    @guardian ||= Guardian.new(current_user)
  end

  def authenticate
  if current_user.try(:role)=="admin"
    true
  else
    redirect_to root_path  
   end  
end  

  private
    
    def current_author_for_object(method, object)  
      if current_user.present?  
        if method==object.id
          return true 
        else
          false        
        end
      else
        false 
      end 
    end


end
