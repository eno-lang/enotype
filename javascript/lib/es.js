const COLOR_REGEX = /^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i;
const DATE_REGEX = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
const DATETIME_REGEX = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/;
const EMAIL_REGEX = /^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/;
const FLOAT_REGEX = /^\s*-?\d+(\.\d+)?\s*$/;
const INTEGER_REGEX = /^\s*-?\d+\s*$/;
const LAT_LNG_REGEX = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;
const URL_REGEX = /^\s*https?:\/\/[^\s.]+\.\S+\s*$/;

exports.boolean = value => {
  switch(value.trim().toLowerCase()) {
    case 'true': return true;
    case 'false': return false;
    case 'yes': return true;
    case 'no': return false;
    default: throw 'Se requiere un valor booleano - valores permitidos son \'true\', \'false\', \'yes\' y \'no\'.';
  }
};

exports.color = value => {
  if(!value.match(COLOR_REGEX))
    throw 'Se requiere un color, por ejemplo \'#B6D918\', \'#fff\' o \'#01b\'.';

  return value;
};

exports.commaSeparated = value => value.split(',').map(item => item.trim());

exports.date = value => {
  const match = DATE_REGEX.exec(value);

  if(!match)
    throw 'Se requiere una fecha valida, por ejemplo \'1993-11-18\'';

  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);

  return new Date(Date.UTC(year, month - 1, day));
};

exports.datetime = value => {
  const match = DATETIME_REGEX.exec(value);

  if(!match)
    throw 'Se requiere una valida fecha o fecha y hora, por ejemplo \'1961-01-22\' o \'1989-11-09T19:17Z\' (vea https://www.w3.org/TR/NOTE-datetime).';
  
  // TODO: Re-implement without depending on fragile and inconsistent dateString parsing implementation
  return new Date(value);
};

exports.email = value => {
  if(!value.match(EMAIL_REGEX))
    throw 'Se requiere una dirección electrónica valida, por ejemplo \'jane.doe@eno-lang.org\'.';

  return value;
};

exports.float = value => {
  if(!value.match(FLOAT_REGEX))
    throw 'Se requiere un número decimal, por ejemplo \'13.0\', \'-9.159\' o \'42\'.';

  return parseFloat(value);
};

exports.integer = value => {
  if(!value.match(INTEGER_REGEX))
    throw 'Se requiere un número entero, por ejemplo \'42\' o \'-21\'.';

  return parseInt(value);
};

exports.json = value => {
  try {
    return JSON.parse(value);
  } catch(err) {
    throw `Se requiere JSON valido - el mensaje del parser fue:\n${err.message}`;
  }
};

exports.latLng = value => {
  const match = LAT_LNG_REGEX.exec(value);

  if(!match)
    throw 'Se requiere una pareja de coordenadas latitud/longitud valida, por ejemplo \'48.2093723, 16.356099\'';

  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
};

exports.url = value => {
  if(!value.match(URL_REGEX))
    throw 'Se requiere un URL valido, por ejemplo \'https://eno-lang.org\'.';

  return value;
};