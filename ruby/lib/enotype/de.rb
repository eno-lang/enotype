require 'json'

COLOR_REGEXP = /^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i
DATE_REGEXP = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/
DATETIME_REGEXP = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/
EMAIL_REGEXP = /^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/
FLOAT_REGEXP = /^\s*-?\d+(\.\d+)?\s*$/
INTEGER_REGEXP = /^\s*-?\d+\s*$/
LAT_LNG_REGEXP = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/
URL_REGEXP = /^\s*https?:\/\/[^\s.]+\.\S+\s*$/

module Enotype
  def self.boolean(value)
    lower = value.strip.downcase
  
    return true if lower == 'true'
    return false if lower == 'false'
    return true if lower == 'yes'
    return false if lower == 'no'
  
    raise 'Ein boolescher Wert ist erforderlich - erlaubte Werte sind \'true\', \'false\', \'yes\' und \'no\'.'
  end
  
  def self.color(value)
    raise 'Eine Farbe ist erforderlich, zum Beispiel \'#B6D918\', \'#fff\' oder \'#01b\'.' unless value.match(COLOR_REGEXP)
  
    value
  end
  
  def self.comma_separated(value)
    value.split(',', -1).map { |item| item.strip  }
  end
  
  def self.date(value)
    match = value.match(DATE_REGEXP)
  
    raise 'Ein valides Datum ist erforderlich, zum Beispiel \'1993-11-18\'.' unless match
  
    year = match[1].to_i
    month = match[2].to_i
    day = match[3].to_i
  
    Time.utc(year, month, day)
  end
  
  def self.datetime(value)
    match = value.match(DATETIME_REGEXP)
  
    raise 'Ein valides Datum oder Datum und Zeit sind erforderlich, zum Beispiel \'1961-01-22\' oder \'1989-11-09T19:17Z\' (siehe https://www.w3.org/TR/NOTE-datetime).' unless match
  
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
    raise 'Eine valide Email Adresse ist erforderlich, zum Beispiel \'jane.doe@eno-lang.org\'.' unless value.match(EMAIL_REGEXP)
  
    value
  end
  
  def self.float(value)
    raise 'Eine Dezimalzahl ist erforderlich, zum Beispiel \'13.0\', \'-9.159\' oder \'42\'.' unless value.match(FLOAT_REGEXP)
    
    value.to_f
  end
  
  def self.integer(value)
    raise 'Eine Ganzzahl ist erforderlich, zum Beispiel \'42\' oder \'-21\'.' unless value.match(INTEGER_REGEXP)
  
    value.to_i
  end
  
  def self.json(value)
    begin
      JSON.parse(value)
    rescue => err
      raise "Valides JSON ist erforderlich - die Meldung des Parsers war:\n#{err.message}"
    end
  end
  
  def self.lat_lng(value)
    match = LAT_LNG_REGEXP.match(value)
  
    raise 'Ein valides Breiten-/Längengrad Koordinatenpaar ist erforderlich, zum Beispiel \'48.2093723, 16.356099\'.' unless match
  
    { lat: match[1].to_f, lng: match[2].to_f }
  end
  
  def self.url(value)
    raise 'Eine valide URL ist erforderlich, zum Beispiel \'https://eno-lang.org\'.' unless value.match(URL_REGEXP)
  
    value
  end
end