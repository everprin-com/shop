class MessagestoadministratorsController < ApplicationController
  before_action :set_messagestoadministrator, only: [:show, :edit, :update, :destroy]
  before_action :only_admin_or_moderator, except: [:new, :create]
  # GET /messagestoadministrators
  # GET /messagestoadministrators.json
  def index
    @messagestoadministrators = Messagestoadministrator.all
  end

  # GET /messagestoadministrators/1
  # GET /messagestoadministrators/1.json
  def show
  end
  
  def new
     @messagestoadministrator = Messagestoadministrator.new
     
  end
  # GET /messagestoadministrators/1/edit
  def edit
  end

  # POST /messagestoadministrators
  # POST /messagestoadministrators.json
  def create
    if signed_in?
      @messagestoadministrator = current_user.messagestoadministrators.build(messagestoadministrator_params)
    else
      @messagestoadministrator = Messagestoadministrator.new(messagestoadministrator_params)
    end
    respond_to do |format|
      if @messagestoadministrator.save
        format.html { redirect_to store_index_path, notice: 'Messagestoadministrator was successfully created.' }
        format.json { render :show, status: :created, location: @messagestoadministrator }
      else
        format.html { render :new }
        format.json { render json: @messagestoadministrator.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /messagestoadministrators/1
  # PATCH/PUT /messagestoadministrators/1.json
  def update
    respond_to do |format|
      if @messagestoadministrator.update(messagestoadministrator_params)
        format.html { redirect_to @messagestoadministrator, notice: 'Messagestoadministrator was successfully updated.' }
        format.json { render :show, status: :ok, location: @messagestoadministrator }
      else
        format.html { render :edit }
        format.json { render json: @messagestoadministrator.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messagestoadministrators/1
  # DELETE /messagestoadministrators/1.json
  def destroy
    @messagestoadministrator.destroy
    respond_to do |format|
      format.html { redirect_to messagestoadministrators_url, notice: 'Messagestoadministrator was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_messagestoadministrator
      @messagestoadministrator = Messagestoadministrator.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def messagestoadministrator_params
      params.require(:messagestoadministrator).permit(:name, :user_id, :telephone, :email, :message)
    end

end
