class MetaDatasController < ApplicationController

  def index
    male = Header.all.where(male: true)
    female = Header.all.where(male: false)

    respond_to do |format|
      format.html
      format.json { render json: { headers: {male: male.to_json, female:  female.to_json}}}
    end
  end
end
