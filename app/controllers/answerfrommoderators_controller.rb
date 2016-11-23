class AnswerfrommoderatorsController < ApplicationController
  before_action :set_answerfrommoderator, only: [:show, :edit, :update, :destroy]
  before_action :only_admin_or_moderator
  # GET /answerfrommoderators
  # GET /answerfrommoderators.json
  def index
    @answerfrommoderators = Answerfrommoderator.all
  end

  # GET /answerfrommoderators/1
  # GET /answerfrommoderators/1.json
  def show
  end

  # GET /answerfrommoderators/new
  def new
    @answerfrommoderator = Answerfrommoderator.new
  end

  # GET /answerfrommoderators/1/edit
  def edit
  end

  # POST /answerfrommoderators
  # POST /answerfrommoderators.json
  def create
    @answerfrommoderator = Answerfrommoderator.new(answerfrommoderator_params)

    respond_to do |format|
      if @answerfrommoderator.save
        format.html { redirect_to @answerfrommoderator, notice: 'Answerfrommoderator was successfully created.' }
        format.json { render :show, status: :created, location: @answerfrommoderator }
      else
        format.html { render :new }
        format.json { render json: @answerfrommoderator.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /answerfrommoderators/1
  # PATCH/PUT /answerfrommoderators/1.json
  def update
    respond_to do |format|
      if @answerfrommoderator.update(answerfrommoderator_params)
        format.html { redirect_to @answerfrommoderator, notice: 'Answerfrommoderator was successfully updated.' }
        format.json { render :show, status: :ok, location: @answerfrommoderator }
      else
        format.html { render :edit }
        format.json { render json: @answerfrommoderator.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answerfrommoderators/1
  # DELETE /answerfrommoderators/1.json
  def destroy
    @answerfrommoderator.destroy
    respond_to do |format|
      format.html { redirect_to answerfrommoderators_url, notice: 'Answerfrommoderator was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answerfrommoderator
      @answerfrommoderator = Answerfrommoderator.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def answerfrommoderator_params
      params.require(:answerfrommoderator).permit(:user_id, :send_message, :name, :content)
    end
end
