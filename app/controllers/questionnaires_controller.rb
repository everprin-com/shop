class QuestionnairesController < ApplicationController
  # respond_to :html, :js, :json

  # def index
  #
  # end

  def create
    questionnaire = Questionnaire.new(resource_params)
    if questionnaire.save
      render json: {questionnaire: {id: questionnaire.id, satus: "success"  } }
    else
      format.json { render json: questionnaire.errors, status: :unprocessable_entity }
    end
  end

  private


  def resource_params
    params.require(:questionnaires).permit(:reason, :slug_id, :category)
  end
end
