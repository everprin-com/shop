class MetaDatasController < ApplicationController

  def index
    headers = Header.all
    respond_to do |format|
      format.html
      format.json { render json: { headers: headers.to_json }}
    end
  end
end
