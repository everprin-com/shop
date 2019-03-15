module StoreHelper
  def count_of_like
    if current_user
      a = @cart.line_items.map(&:quantity)
      b = a.inject { |sum, x| sum + x }
    end
  end

  def count_of_product
    if @cart.line_items.present?
      a = @cart.line_items.map(&:quantity)
      b = a.inject { |sum, x| sum + x }
      b
    else
      0
    end
  end
end
