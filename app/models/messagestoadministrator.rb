class Messagestoadministrator < ActiveRecord::Base
  belongs_to :user
  validates :name, :telephone, :message, presence: true
end
