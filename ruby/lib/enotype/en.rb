require 'json'

COLOR_REGEXP = /^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i
DATE_REGEXP = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/
DATETIME_REGEXP = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/
EMAIL_REGEXP = /^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/
FLOAT_REGEXP = /^\s*-?\d+(\.\d+)?\s*$/
INTEGER_REGEXP = /^\s*-?\d+\s*$/
LAT_LNG_REGEXP = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/
SLUG_REGEXP = /^[0-9a-z\-_]+$/
URL_REGEXP = /^\s*https?:\/\/[^\s.]+\.\S+\s*$/

module Enotype
  def self.boolean(value)
    lower = value.strip.downcase
  
    return true if lower == 'true'
    return false if lower == 'false'
    return true if lower == 'yes'
    return false if lower == 'no'
  
    raise 'A boolean is required - allowed values are \'true\', \'false\', \'yes\' and \'no\'.'
  end
  
  def self.color(value)
    raise 'A color is required, for instance \'#B6D918\', \'#fff\' or \'#01b\'.' unless value.match(COLOR_REGEXP)
  
    value
  end
  
  def self.comma_separated(value)
    value.split(',', -1).map { |item| item.strip  }
  end
  
  def self.date(value)
    match = value.match(DATE_REGEXP)
  
    raise 'A valid date is required, for instance \'1993-11-18\'.' unless match
  
    year = match[1].to_i
    month = match[2].to_i
    day = match[3].to_i
  
    Time.utc(year, month, day)
  end
  
  def self.datetime(value)
    match = value.match(DATETIME_REGEXP)
  
    raise 'A valid date or date and time are required, for instance \'1961-01-22\' or \'1989-11-09T19:17Z\' (see https://www.w3.org/TR/NOTE-datetime).' unless match
  
    year = match[1].to_i
    month = match[2] ? match[2].to_i : 1
    day = match[3] ? match[3].to_i : 1
    hour = match[4] ? match[4].to_i : 0
    minute = match[5] ? match[5].to_i : 0
    second = match[6] ? match[6].to_i : 0
    fraction = match[7] ? "0.#{match[7]}".to_f : 0
    zulu = match[8]
    offset = zulu ? '+00:00' : "#{match[9] || '+'}#{match[10] || '00'}:#{match[11] || '00'}"
  
    Time.new(year, month, day, hour, minute, second + fraction, offset)
  end
  
  def self.email(value)
    raise 'A valid email address is required, for instance \'jane.doe@eno-lang.org\'.' unless value.match(EMAIL_REGEXP)
  
    value
  end
  
  def self.float(value)
    raise 'A decimal number is required, for instance \'13.0\', \'-9.159\' or \'42\'.' unless value.match(FLOAT_REGEXP)
    
    value.to_f
  end
  
  def self.integer(value)
    raise 'An integer is required, for instance \'42\' or \'-21\'.' unless value.match(INTEGER_REGEXP)
  
    value.to_i
  end
  
  def self.json(value)
    begin
      JSON.parse(value)
    rescue => err
      raise "Valid JSON is required - the parser returned:\n#{err.message}"
    end
  end
  
  def self.lat_lng(value)
    match = LAT_LNG_REGEXP.match(value)
  
    raise 'A valid latitude/longitude coordinate pair is required, for instance \'48.2093723, 16.356099\'.' unless match
  
    { lat: match[1].to_f, lng: match[2].to_f }
  end
  
  def self.slug(value)
    raise 'A slug like for instance \'blog_post\', \'eno-notation\' or \'62-things\' is required - only the characters a-z, 0-9, \'-\' und \'_\' are allowed.' unless value.match(SLUG_REGEXP)
  
    value
  end
  
  def self.url(value)
    raise 'A valid URL is required, for instance \'https://eno-lang.org\'.' unless value.match(URL_REGEXP)
  
    value
  end
end