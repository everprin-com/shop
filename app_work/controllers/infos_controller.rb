class InfosController < ApplicationController

  before_action :authenticate_user!, :except => [:show, :index]
  before_action :set_info, only: [:show,:edit, :update, :destroy]
  before_action :define_eccept, only: [:edit, :update, :destroy]
   before_action :only_admin_or_moderator, only: [:index]
  # GET /infos
  # GET /infos.json
  def index
   redirect_to "/admin/admins"
  end

  def show_from_navbar
    @info =Info.find_by(user_id: params[:user_id])
    @user=User.find(params[:user_id])
    render "infos/show"
  end

  #def show_from_email
    # @info =Info.find_by(32)
    # render "show"
  #end

  # GET /infos/1
  # GET /infos/1.json
  def show
    @user=@info.user
  end

  # GET /infos/new
  def new
    @info = Info.new
  end
 
  # GET /infos/1/edit
  def edit
  end

  # POST /infos
  # POST /infos.json
  def create
    @info = Info.new(info_params)
    @info.user_id=current_user.id
    respond_to do |format|
      if @info.save
        format.html { redirect_to @info, notice: 'Info was successfully created.' }
        format.json { render :show, status: :created, location: @info }
      else
        format.html { render :new }
        format.json { render json: @info.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /infos/1
  # PATCH/PUT /infos/1.json
  def update
    respond_to do |format|
      if @info.update(info_params)
        format.html { redirect_to @info, notice: 'Info was successfully updated.' }
        format.json { render :show, status: :ok, location: @info }
       # format.js 
      
      else
        format.html { render :edit }
        format.json { render json: @info.errors, status: :unprocessable_entity }
       # format.js 
      end
    end
  end

  # DELETE /infos/1
  # DELETE /infos/1.json
  def destroy
    @info.destroy
    respond_to do |format|
      format.html { redirect_to infos_url, notice: 'Info was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.  
  def define_eccept
    if current_user.info.id==@info.id || can_manage_has_one(current_user.info, @info, Info)
      return true
    else
      redirect_to root_path 
    end
  end

  def set_info
    begin
      @info=Info.find(params[:id])
    rescue
      raise Cinema::NotFound 
    end
  end 
    # Never trust parameters from the scary internet, only allow the white list through.
  def info_params
    params.require(:info).permit(:send_new_film, :send_comments_to_film, :ban, :data, :name, :city, :user_id, :bio, :telephone, :photo)
  end

end
