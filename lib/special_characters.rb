# Use <code>sc(:symbol[,:symbol,...])</code> to display special html-characters
module SpecialCharacters
  BR = "\n<br/>".html_safe
  POINTER_RIGHT = '&#08594;'.freeze
  POINTER_LEFT = '&#08592;'.freeze
  NBSP = '&nbsp;'.freeze
  SP = '&nbsp;'.freeze
  OK = '&#10004;'.freeze
  NOT = '&#10008;'.freeze
  CLOSE = '&#08855;'.freeze
  ESC = '&#08855;'.freeze
  ADD = '&#10010;'.freeze
  REMOVE = '&#10007;'.freeze
  FON = '&#09990;'.freeze
  MAIL = '&#09993;'.freeze
  COMMENT = '&#09997;'.freeze
  EDIT = '&#09998;'.freeze
  UNFLAGED = '&#09872;'.freeze
  FLAGED = '&#09873;'.freeze
  STAR = '&#10025;'.freeze
  STAR_SELECTED = '&#10026;'.freeze
  APOSTROPHY_OPEN = '&#10077;'.freeze
  APOSTROPHY_CLOSE = '&#10078;'.freeze

  CHARACTERS = {
    br: BR,
    pointer_right: POINTER_RIGHT,
    pr: POINTER_RIGHT,
    pl: POINTER_LEFT,
    nbsp: NBSP,
    sp: SP,
    ok: OK,
    not: NOT,
    failed: NOT,
    close: CLOSE,
    esc: ESC,
    add: ADD,
    remove: REMOVE,
    fon: FON,
    mail: MAIL,
    comment: COMMENT,
    edit: EDIT,
    unflaged: UNFLAGED,
    flaged: FLAGED,
    star: STAR,
    star_selected: STAR_SELECTED,
    apostrophy_open: APOSTROPHY_OPEN,
    apostrophy_close: APOSTROPHY_CLOSE
  }.freeze

  # <code>sc([:br,:pr,:close])</code> will return one html-string of special
  # characters and html-tags. <b><br />->X</b>
  def sc(*names)
    n = []
    while x = names.shift
      n << x
    end
    begin
      rc = ''
      n.each { |c| rc += CHARACTERS[c] }
      rc.html_safe
    rescue StandardError => e
      "SPECIAL CHAR #{names.inspect} NOT DEFINED IN #{__FILE__} - ERROR #{e.message}"
    end
  end
end
