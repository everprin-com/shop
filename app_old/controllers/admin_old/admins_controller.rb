module Admin
class AdminsController < Admin::BaseController
   
   before_action :authenticate_user!

 def index 
    @infos = Info.all
    @user=User.all
  end

end


end