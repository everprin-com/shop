class Parser < Nokogiri::XML::SAX::Document
  def start_element(name, attrs = [])
    # обрабатываем каждый элемент (получаем имя и атрибуты)
  end
  def characters(data)
    # любые символы между началом и концом элемента
  end
  def end_element(name)
    # как только достигнут закрывающийся тег элемента (получаем имя элемента)
  end
end
