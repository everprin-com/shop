class MetaDatasController < ApplicationController

  def index
    meta_datas = Header.all
    respond_to do |format|
      format.html
      format.json { render json: meta_datas.to_json }
    end
  end
end
