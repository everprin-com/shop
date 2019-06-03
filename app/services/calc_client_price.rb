class CalcClientPrice
  def self.calc_client_price(price)
    return unless price
    if price.to_f * 0.3 > 80
      price.to_f * 1.3
    else
      price.to_f + 80
    end
  end
end
