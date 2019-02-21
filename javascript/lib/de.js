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
  if(!value.match(/^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i))
    throw 'Eine Farbe ist erforderlich, zum Beispiel \'#B6D918\', \'#fff\' oder \'#01b\'.';

  return value;
};

exports.commaSeparated = value => value.split(',').map(item => item.trim());

exports.date = value => {
  const match = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/.exec(value);

  if(!match)
    throw 'Ein valides Datum ist erforderlich, zum Beispiel \'1993-11-18\'.';

  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);

  return new Date(Date.UTC(year, month - 1, day));
};

exports.datetime = value => {
  const match = /^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/.exec(value);

  if(!match)
    throw 'Ein valides Datum oder Datum und Zeit sind erforderlich, zum Beispiel \'1961-01-22\' oder \'1989-11-09T19:17Z\' (siehe https://www.w3.org/TR/NOTE-datetime).';
  
  // TODO: Re-implement without depending on fragile and inconsistent dateString parsing implementation
  return new Date(value);
};

exports.email = value => {
  if(!value.match(/^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/))
    throw 'Eine valide Email Adresse ist erforderlich, zum Beispiel \'jane.doe@eno-lang.org\'.';

  return value;
};

exports.float = value => {
  if(!value.match(/^\s*-?\d+(\.\d+)?\s*$/))
    throw 'Eine Dezimalzahl ist erforderlich, zum Beispiel \'13.0\', \'-9.159\' oder \'42\'.';

  return parseFloat(value);
};

exports.integer = value => {
  if(!value.match(/^\s*-?\d+\s*$/))
    throw 'Eine Ganzzahl ist erforderlich, zum Beispiel \'42\' oder \'-21\'.';

  return parseInt(value);
};

exports.json = value => {
  try {
    return JSON.parse(value);
  } catch(err) {
    throw `Valides JSON ist erforderlich - die Meldung des Parsers war:\n${err.message}`;
  }
};

exports.latLng = value => {
  const match = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/.exec(value);

  if(!match)
    throw 'Ein valides Breiten-/Längengrad Koordinatenpaar ist erforderlich, zum Beispiel \'48.2093723, 16.356099\'.';

  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
};

exports.url = value => {
  if(!value.match(/^\s*https?:\/\/[^\s.]+\.\S+\s*$/))
    throw 'Eine valide URL ist erforderlich, zum Beispiel \'https://eno-lang.org\'.';

  return value;
};