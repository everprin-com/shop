class ParserXml
  include ActiveModel::Model

  attr_accessor :file

  def initialize(attributes={}, name_drop_ship)
    attributes.each { |name, value| send("#{name}=", value) }
    @name_drop_ship = name_drop_ship
  end

end
