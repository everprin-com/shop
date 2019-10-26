class CalcClientPrice

  INCOME_DEPEND_DROP_SHIP = { "Favoritti" => 1.5 }

  def self.calc_client_price(price, name_drop_ship={})
    return unless price
    if name_drop_ship&.capitalize == "Favoritti"
      (price.to_f * INCOME_DEPEND_DROP_SHIP["Favoritti"]).ceil
    elsif price.to_f * 0.3 > 80
      (price.to_f * 1.3).ceil
    else
      (price.to_f + 80).ceil
    end
  end
end
