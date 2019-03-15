# Inject some extra functions to class String
module StringExtensions
  # Extend the class String with this module's class methods
  # when this module is included.
  def self.included(_base)
    String.extend StringExtensions::ClassMethods
    String.send :include, InstanceMethods
  end

  # Class-methods for String
  module ClassMethods
    # Characters which may be used in random strings
    RAND_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'.freeze

    #
    # random string of 'len' characters length
    def random_string(len)
      rand_max = RAND_CHARS.size
      ret = ''
      len.times { ret << RAND_CHARS[rand(rand_max)] }
      ret
    end
  end

  # Instance-methods for String-objects
  module InstanceMethods
    # Replace ' and " with * and blanks with _ to make the string
    # usable for URLs
    def txt_to_url
      tr(' ', '_').gsub(/"/, '**').tr("'", '*').downcase
    end

    # Replace _ with blanks, ** with " and * with '
    def url_to_txt
      gsub(/\*\*/, '"').tr('*', "'").tr('_', ' ').humanize
    end

    # Don't hanldle $ in the URL as an RegEx $-sign
    def escape_regex
      gsub(/\$/, '\\$')
    end

    # Split the string into paragraphs (\n)
    # "Par 1\nPar 2".paragraphs => ['Par 1', 'Par 2']
    # "Par 1\nPar 2\nPar 3".paragraphs(0..1) => "Par 1\nPar 2"
    def paragraphs(range = nil)
      if range
        truncated = split("\n")[range].join("\n")
        truncated += '...' if truncated.length < length
        truncated
      else
        split("\n")
      end
    end
  end
end
