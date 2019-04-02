require 'ipaddr'
require 'json'

COLOR_REGEXP = /^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i
DATE_REGEXP = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/
DATETIME_REGEXP = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/
EMAIL_REGEXP = /^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/
FLOAT_REGEXP = /^\s*-?\d+(\.\d+)?\s*$/
INTEGER_REGEXP = /^\s*-?\d+\s*$/
IPV4_REGEXP = /^\s*((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))\s*$/
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
  
    raise 'Se requiere un valor booleano - valores permitidos son \'true\', \'false\', \'yes\' y \'no\'.'
  end
  
  def self.color(value)
    raise 'Se requiere un color, por ejemplo \'#B6D918\', \'#fff\' o \'#01b\'.' unless value.match(COLOR_REGEXP)
  
    value
  end
  
  def self.comma_separated(value)
    value.split(',', -1).map { |item| item.strip  }
  end
  
  def self.date(value)
    match = value.match(DATE_REGEXP)
  
    raise 'Se requiere una fecha valida, por ejemplo \'1993-11-18\'' unless match
  
    year = match[1].to_i
    month = match[2].to_i
    day = match[3].to_i
  
    Time.utc(year, month, day)
  end
  
  def self.datetime(value)
    match = value.match(DATETIME_REGEXP)
  
    raise 'Se requiere una valida fecha o fecha y hora, por ejemplo \'1961-01-22\' o \'1989-11-09T19:17Z\' (vea https://www.w3.org/TR/NOTE-datetime).' unless match
  
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
    raise 'Se requiere una dirección electrónica valida, por ejemplo \'jane.doe@eno-lang.org\'.' unless value.match(EMAIL_REGEXP)
  
    value
  end
  
  def self.float(value)
    raise 'Se requiere un número decimal, por ejemplo \'13.0\', \'-9.159\' o \'42\'.' unless value.match(FLOAT_REGEXP)
    
    value.to_f
  end
  
  def self.integer(value)
    raise 'Se requiere un número entero, por ejemplo \'42\' o \'-21\'.' unless value.match(INTEGER_REGEXP)
  
    value.to_i
  end
  
  def self.ipv4(value)
    match = value.match(IPV4_REGEXP)
  
    return match[1] if match &&
                       match[2].to_i.between?(0, 255) &&
                       match[3].to_i.between?(0, 255) &&
                       match[4].to_i.between?(0, 255) &&
                       match[5].to_i.between?(0, 255)
  
    raise 'Se requiere una valida dirección IPv4, por ejemplo \'192.168.0.1\'.'
  end
  
  def self.ipv6(value)
    begin
      return value if IPAddr.new(value).ipv6?
    rescue IPAddr::Error => err
      # fall through
    end
  
    raise 'Se requiere una valida dirección IPv6, por ejemplo \'2001:db8::\'.'
  end
  
  def self.json(value)
    begin
      JSON.parse(value)
    rescue => err
      raise "Se requiere JSON valido - el mensaje del parser fue:\n#{err.message}"
    end
  end
  
  def self.lat_lng(value)
    match = LAT_LNG_REGEXP.match(value)
  
    raise 'Se requiere una pareja de coordenadas latitud/longitud valida, por ejemplo \'48.2093723, 16.356099\'' unless match
  
    { lat: match[1].to_f, lng: match[2].to_f }
  end
  
  def self.slug(value)
    raise 'Se requiere un slug como por ejemplo \'blog_post\', \'eno-notacion\' o \'62-cosas\' - solo los caracteres a-z, 0-9, \'-\' und \'_\' son permitidos.' unless value.match(SLUG_REGEXP)
  
    value
  end
  
  def self.url(value)
    raise 'Se requiere un URL valido, por ejemplo \'https://eno-lang.org\'.' unless value.match(URL_REGEXP)
  
    value
  end

  def self.procs(*explicitly_requested)
    available = self.singleton_methods.reject { |name| name == :procs }

    if explicitly_requested.empty?
      available.to_h do |name|
        [name, Proc.new { |value| self.send(name, value) }]
      end
    else
      explicitly_requested.to_h do |name|
        unless available.include?(name)
          list = available.map { |name| ":#{name}" }.join(', ')
          raise "Enotype does not provide :#{name}, available are: #{list}"
        end

        [name, Proc.new { |value| self.send(name, value) }]
      end
    end
  end
end