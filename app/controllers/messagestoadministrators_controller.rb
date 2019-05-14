class MessagestoadministratorsController < ApplicationController
  include ControllerRails
  before_action :only_admin_or_moderator, except: %i[new create]
  respond_to :html, :js, :json

  def set_model
    @model = Messagestoadministrator
  end

  def create
    message = Messagestoadministrator.create!(resource_params)
    TeleNotify::TelegramUser.find_by_tg_channel("question").send_message(message.to_json) if message
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def resource_params
    params.require(:messagestoadministrator).permit(:name, :user_id, :telephone, :email, :message)
  end
end
