class MetaDatasController < ApplicationController

  def index
    males = Header.all.where(male: true)
    females = Header.all.where(male: false)
    #male_fields = Header.all.where(male: true).map { |male| HeaderSerializer.new(male) }
    #female_fields = Header.all.where(male: false).map { |female| HeaderSerializer.new(female) }
    #format.json { render json: { headers: {male: male_fields, female:  female_fields}}}
    respond_to do |format|
      format.html
      format.json { render json: { headers: {male: males.to_json, female:  females.to_json}}}
    end
  end
end
