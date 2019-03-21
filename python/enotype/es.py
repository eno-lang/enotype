import re
from datetime import date as python_date
from datetime import datetime as python_datetime
import json as python_json

COLOR_RE = re.compile(r'^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$', re.IGNORECASE)
DATE_RE = re.compile(r'^\s*(\d{4})-(\d\d)-(\d\d)\s*$')
DATETIME_RE = re.compile(r'^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$')
EMAIL_RE = re.compile(r'^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$')
python_float = float
FLOAT_RE = re.compile(r'^\s*-?\d+(\.\d+)?\s*$')
INTEGER_RE = re.compile(r'^\s*-?\d+\s*$')
IPV4_RE = re.compile(r'^\s*((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))\s*$')
LAT_LNG_RE = re.compile(r'^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$')
SLUG_RE = re.compile(r'^[0-9a-z\-_]+$')
URL_RE = re.compile(r'^\s*https?:\/\/[^\s.]+\.\S+\s*$')

def boolean(value):
  lower = value.strip().lower()

  if lower == 'true':
    return True
  if lower == 'false':
    return False
  if lower == 'yes':
    return True
  if lower == 'no':
    return False

  raise ValueError('Se requiere un valor booleano - valores permitidos son \'true\', \'false\', \'yes\' y \'no\'.')

def color(value):
  if not COLOR_RE.match(value):
    raise ValueError('Se requiere un color, por ejemplo \'#B6D918\', \'#fff\' o \'#01b\'.')

  return value

def comma_separated(value):
  return [item.strip() for item in value.split(',')]

def date(value):
  match = DATE_RE.match(value)

  if not match:
    raise ValueError('Se requiere una fecha valida, por ejemplo \'1993-11-18\'')

  year = int(match.group(1))
  month = int(match.group(2))
  day = int(match.group(3))

  return python_date(year, month, day)

def datetime(value):
  match = DATETIME_RE.match(value)

  if not match:
    raise ValueError('Se requiere una valida fecha o fecha y hora, por ejemplo \'1961-01-22\' o \'1989-11-09T19:17Z\' (vea https://www.w3.org/TR/NOTE-datetime).')

  year = match.group(1)
  month = match.group(2) or '01'
  day = match.group(3) or '01'
  hour = match.group(4) or '00'
  minute = match.group(5) or '00'
  second = match.group(6) or '00'
  fraction = match.group(7) or '00'
  zulu = match.group(8)

  if zulu is None:
    offset_sign = match.group(9) or '+'
    offset_hours = match.group(10) or '00'
    offset_minutes = match.group(11) or '00'
  else:
    offset_sign = '+'
    offset_hours = '00'
    offset_minutes = '00'

  normalized = f"{year}-{month}-{day}T{hour}:{minute}:{second}.{fraction}{offset_sign}{offset_hours}{offset_minutes}"

  # TODO: See if this can be replaced with a direct initialization without another string parse step at some point
  return python_datetime.strptime(normalized, '%Y-%m-%dT%H:%M:%S.%f%z')

def email(value):
  if not EMAIL_RE.match(value):
    raise ValueError('Se requiere una dirección electrónica valida, por ejemplo \'jane.doe@eno-lang.org\'.')

  return value

def float(value):
  if not FLOAT_RE.match(value):
    raise ValueError('Se requiere un número decimal, por ejemplo \'13.0\', \'-9.159\' o \'42\'.')

  return python_float(value)

def integer(value):
  if not INTEGER_RE.match(value):
    raise ValueError('Se requiere un número entero, por ejemplo \'42\' o \'-21\'.')

  return int(value)

def ipv4(value):
  match = IPV4_RE.match(value)

  if (match and
      0 <= int(match.group(2)) <= 255 and
      0 <= int(match.group(3)) <= 255 and
      0 <= int(match.group(4)) <= 255 and
      0 <= int(match.group(5)) <= 255):
    return match.group(1)

  raise ValueError('Se requiere una valida dirección IPv4, por ejemplo \'192.168.0.1\'.')

def json(value):
  try:
    return python_json.loads(value)
  except python_json.JSONDecodeError as e:
    raise ValueError(f"Se requiere JSON valido - el mensaje del parser fue:\n{e}")

def lat_lng(value):
  match = LAT_LNG_RE.match(value)

  if not match:
    raise ValueError('Se requiere una pareja de coordenadas latitud/longitud valida, por ejemplo \'48.2093723, 16.356099\'')

  return { 'lat': python_float(match.group(1)), 'lng': python_float(match.group(2)) }

def slug(value):
  if not SLUG_RE.match(value):
    raise ValueError('Se requiere un slug como por ejemplo \'blog_post\', \'eno-notacion\' o \'62-cosas\' - solo los caracteres a-z, 0-9, \'-\' und \'_\' son permitidos.')

  return value

def url(value):
  if not URL_RE.match(value):
    raise ValueError('Se requiere un URL valido, por ejemplo \'https://eno-lang.org\'.')

  return value
