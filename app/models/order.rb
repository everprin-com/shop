class Order < ActiveRecord::Base
  has_many :line_items, dependent: :destroy
  has_one :statistic
  #PAYMENT_TYPES = ['Check', 'Credit card', 'Purchase order'].freeze

  validates :name, :address, :phone, presence: true
  #validates :pay_type, inclusion: PAYMENT_TYPES
  #after_create :new_order
  before_create do
    self.id = [10000, self.class.maximum(:id)+1].max if self.id.nil?
  end

  def new_order
    OrderMailer.new_order(self).deliver_now
  end
end
