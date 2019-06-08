class CalcClientPrice
  def self.calc_client_price(price)
    return unless price
    if price.to_f * 0.3 > 80
      (price.to_f * 1.3).ceil
    else
      (price.to_f + 80).ceil
    end
  end
end
