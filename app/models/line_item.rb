class LineItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :cart
  belongs_to :order

  def copy_attrs_from(object)
    prod_attrs = [:price, :article, :name, :price, :color, :category, :drop_ship]
    prod_attrs.each do |attr|
      self.send("#{attr}=", object.send("#{attr}"))
    end
  end

  def total_price
    price = product.price
    quantity * price
  end
end
