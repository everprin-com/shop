class CalcClientPrice
  def self.calc_client_price(price)
    return unless price
    price.to_f < 80 ? (price.to_f + 80) : (price.to_f * 1.3)
  end
end
