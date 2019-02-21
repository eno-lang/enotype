exports.boolean = value => {
  switch(value.trim().toLowerCase()) {
    case 'true': return true;
    case 'false': return false;
    case 'yes': return true;
    case 'no': return false;
    default: throw 'A boolean is required - allowed values are \'true\', \'false\', \'yes\' and \'no\'.';
  }
};

exports.color = value => {
  if(!value.match(/^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i))
    throw 'A color is required, for instance \'#B6D918\', \'#fff\' or \'#01b\'.';

  return value;
};

exports.commaSeparated = value => value.split(',').map(item => item.trim());

exports.date = value => {
  const match = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/.exec(value);

  if(!match)
    throw 'A valid date is required, for instance \'1993-11-18\'.';

  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);

  return new Date(Date.UTC(year, month - 1, day));
};

exports.datetime = value => {
  const match = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/.exec(value);

  if(!match)
    throw 'A valid date or date and time are required, for instance \'1961-01-22\' or \'1989-11-09T19:17Z\' (see https://www.w3.org/TR/NOTE-datetime).';
  
  // TODO: Re-implement without depending on fragile and inconsistent dateString parsing implementation
  return new Date(value);
};

exports.email = value => {
  if(!value.match(/^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/))
    throw 'A valid email address is required, for instance \'jane.doe@eno-lang.org\'.';

  return value;
};

exports.float = value => {
  if(!value.match(/^\s*-?\d+(\.\d+)?\s*$/))
    throw 'A decimal number is required, for instance \'13.0\', \'-9.159\' or \'42\'.';

  return parseFloat(value);
};

exports.integer = value => {
  if(!value.match(/^\s*-?\d+\s*$/))
    throw 'An integer is required, for instance \'42\' or \'-21\'.';

  return parseInt(value);
};

exports.json = value => {
  try {
    return JSON.parse(value);
  } catch(err) {
    throw `Valid JSON is required - the parser returned:\n${err.message}`;
  }
};

exports.latLng = value => {
  const match = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/.exec(value);

  if(!match)
    throw 'A valid latitude/longitude coordinate pair is required, for instance \'48.2093723, 16.356099\'.';

  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
};

exports.url = value => {
  if(!value.match(/^\s*https?:\/\/[^\s.]+\.\S+\s*$/))
    throw 'A valid URL is required, for instance \'https://eno-lang.org\'.';

  return value;
};