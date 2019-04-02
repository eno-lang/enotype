const COLOR_REGEX = /^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i;
const DATE_REGEX = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
const DATETIME_REGEX = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/;
const EMAIL_REGEX = /^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/;
const FLOAT_REGEX = /^\s*-?\d+(\.\d+)?\s*$/;
const INTEGER_REGEX = /^\s*-?\d+\s*$/;
const IPV4_REGEX = /^\s*((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))\s*$/;
const IPV6_REGEX = /^\s*((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))\s*$/;
const LAT_LNG_REGEX = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;
const SLUG_REGEX = /^[0-9a-z\-_]+$/;
const URL_REGEX = /^\s*https?:\/\/[^\s.]+\.\S+\s*$/;

exports.boolean = value => {
  switch(value.trim().toLowerCase()) {
    case 'true': return true;
    case 'false': return false;
    case 'yes': return true;
    case 'no': return false;
    default: throw 'Ein boolescher Wert ist erforderlich - erlaubte Werte sind \'true\', \'false\', \'yes\' und \'no\'.';
  }
};

exports.color = value => {
  if(!value.match(COLOR_REGEX))
    throw 'Eine Farbe ist erforderlich, zum Beispiel \'#B6D918\', \'#fff\' oder \'#01b\'.';

  return value;
};

exports.commaSeparated = value => value.split(',').map(item => item.trim());

exports.date = value => {
  const match = DATE_REGEX.exec(value);

  if(!match)
    throw 'Ein valides Datum ist erforderlich, zum Beispiel \'1993-11-18\'.';

  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);

  return new Date(Date.UTC(year, month - 1, day));
};

exports.datetime = value => {
  const match = DATETIME_REGEX.exec(value);

  if(!match)
    throw 'Ein valides Datum oder Datum und Zeit sind erforderlich, zum Beispiel \'1961-01-22\' oder \'1989-11-09T19:17Z\' (siehe https://www.w3.org/TR/NOTE-datetime).';
  
  // TODO: Re-implement without depending on fragile and inconsistent dateString parsing implementation
  return new Date(value);
};

exports.email = value => {
  if(!value.match(EMAIL_REGEX))
    throw 'Eine valide Email Adresse ist erforderlich, zum Beispiel \'jane.doe@eno-lang.org\'.';

  return value;
};

exports.float = value => {
  if(!value.match(FLOAT_REGEX))
    throw 'Eine Dezimalzahl ist erforderlich, zum Beispiel \'13.0\', \'-9.159\' oder \'42\'.';

  return parseFloat(value);
};

exports.integer = value => {
  if(!value.match(INTEGER_REGEX))
    throw 'Eine Ganzzahl ist erforderlich, zum Beispiel \'42\' oder \'-21\'.';

  return parseInt(value);
};

exports.ipv4 = value => {
  const match = IPV4_REGEX.exec(value);

  if(match) {
    const octet1 = parseInt(match[2]);
    const octet2 = parseInt(match[3]);
    const octet3 = parseInt(match[4]);
    const octet4 = parseInt(match[5]);
    
    if(octet1 >= 0 && octet1 <= 255 &&
       octet2 >= 0 && octet2 <= 255 &&
       octet3 >= 0 && octet3 <= 255 &&
       octet4 >= 0 && octet4 <= 255)
      return match[1];
  }

  throw 'Eine valide IPv4 Adresse ist erforderlich, zum Beispiel \'192.168.0.1\'.';
};

exports.ipv6 = value => {
  const match = IPV6_REGEX.exec(value);

  if(match) {
    const octet1 = parseInt(match[2]);
    const octet2 = parseInt(match[3]);
    const octet3 = parseInt(match[4]);
    const octet4 = parseInt(match[5]);
    
    if(octet1 >= 0 && octet1 <= 255 &&
       octet2 >= 0 && octet2 <= 255 &&
       octet3 >= 0 && octet3 <= 255 &&
       octet4 >= 0 && octet4 <= 255)
      return match[1];
  }

  throw 'Eine valide IPv6 Adresse ist erforderlich, zum Beispiel \'2001:db8::\'.';
};

exports.json = value => {
  try {
    return JSON.parse(value);
  } catch(err) {
    throw `Valides JSON ist erforderlich - die Meldung des Parsers war:\n${err.message}`;
  }
};

exports.latLng = value => {
  const match = LAT_LNG_REGEX.exec(value);

  if(!match)
    throw 'Ein valides Breiten-/Längengrad Koordinatenpaar ist erforderlich, zum Beispiel \'48.2093723, 16.356099\'.';

  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
};

exports.slug = value => {
  if(!value.match(SLUG_REGEX))
    throw 'Ein Slug wie zum Beispiel \'blog_post\', \'eno-notation\' oder \'62-dinge\' ist erforderlich - nur die Zeichen a-z, 0-9, \'-\' und \'_\' sind erlaubt.';

  return value;
};

exports.url = value => {
  if(!value.match(URL_REGEX))
    throw 'Eine valide URL ist erforderlich, zum Beispiel \'https://eno-lang.org\'.';

  return value;
};