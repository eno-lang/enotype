# enotype

**A cross-language type library**

```js
const { color } = require('enotype');

color('#fff'); // returns "#fff"
color('#xyz'); // throws "A color is required, for instance '#B6D918', '#fff' or '#01b'."
```

```js
const { color } = require('enotype/es'); // with localized error messages

color('#xyz'); // throws "Se requiere un color, por ejemplo '#B6D918', '#fff' o '#01b'."
```

## Installation

```
npm install enotype
```

## Features

- Validation and conversion of `string` representations into language-native types.
- Implemented as a collection of minimalist functions, so called *loaders*.
- Zero-cost localization (currently `de`, `en`, `es`) through statically generated code.
- Generically usable in a multitude of contexts through a plain and simple design.
- Standard type library for the [eno notation language](https://eno-lang.org).

## Documentation

### boolean

```js
const { boolean } = require('enotype');

boolean('true'); // returns true
```

`'true'` returns `true`.  
`'false'` returns `false`.  
`'yes'` returns `true`.  
`'no'` returns `false`.  
`'nope'` throws an error.
### color

```js
const { color } = require('enotype');

color('#abcdef'); // returns '#abcdef'
```

`'#abcdef'` returns `'#abcdef'`.  
`'#ABCDEF'` returns `'#ABCDEF'`.  
`'#012345'` returns `'#012345'`.  
`'#678'` returns `'#678'`.  
`'#89a'` returns `'#89a'`.  
`'#ab'` throws an error.  
`'#abcd'` throws an error.  
`'#abcde'` throws an error.  
`'#bcdefg'` throws an error.  
`'blue'` throws an error.
### commaSeparated

```js
const { commaSeparated } = require('enotype');

commaSeparated('one,two,three'); // returns ['one', 'two', 'three']
```

`'one,two,three'` returns `['one', 'two', 'three']`.  
`' one,two,three '` returns `['one', 'two', 'three']`.  
`'one , two , three'` returns `['one', 'two', 'three']`.  
`' one , two , three '` returns `['one', 'two', 'three']`.  
`',,'` returns `['', '', '']`.  
`'one two three'` returns `['one two three']`.  
`'one;two;three'` returns `['one;two;three']`.  
`'   '` returns `['']`.
### date

```js
const { date } = require('enotype');

date('1992-02-02'); // returns new Date(Date.UTC(1992, 1, 2))
```

`'1992-02-02'` returns `new Date(Date.UTC(1992, 1, 2))`.  
`'1990'` throws an error.  
`'1991-01'` throws an error.  
`'1993-03-03T1920+01:00'` throws an error.  
`'1994-04-04T1920:30+01:00'` throws an error.  
`'1995-05-05T1920:30.45+01:00'` throws an error.  
`'1996-06-06T0815:30-05:00'` throws an error.  
`'1997-07-07T1315:30Z'` throws an error.  
`'2002 12 14'` throws an error.  
`'2002-12-14 20:15'` throws an error.  
`'January'` throws an error.  
`'13:00'` throws an error.
### datetime

```js
const { datetime } = require('enotype');

datetime('1990'); // returns new Date(Date.UTC(1990, 0, 1))
```

`'1990'` returns `new Date(Date.UTC(1990, 0, 1))`.  
`'1991-01'` returns `new Date(Date.UTC(1991, 0, 1))`.  
`'1992-02-02'` returns `new Date(Date.UTC(1992, 1, 2))`.  
`'1993-03-03T19:20+01:00'` returns `new Date(Date.UTC(1993, 2, 3, 18, 20))`.  
`'1994-04-04T19:20:30+01:00'` returns `new Date(Date.UTC(1994, 3, 4, 18, 20, 30))`.  
`'1995-05-05T19:20:30.45+01:00'` returns `new Date(Date.UTC(1995, 4, 5, 18, 20, 30, 450))`.  
`'1996-06-06T08:15:30-05:00'` returns `new Date(Date.UTC(1996, 5, 6, 13, 15, 30))`.  
`'1997-07-07T13:15:30Z'` returns `new Date(Date.UTC(1997, 6, 7, 13, 15, 30))`.  
`'2002 12 14'` throws an error.  
`'2002-12-14 20:15'` throws an error.  
`'January'` throws an error.  
`'13:00'` throws an error.
### email

```js
const { email } = require('enotype');

email('john.doe@eno-lang.org'); // returns 'john.doe@eno-lang.org'
```

`'john.doe@eno-lang.org'` returns `'john.doe@eno-lang.org'`.  
`'john.doe@eno-lang'` throws an error.  
`'@eno-lang.org'` throws an error.  
`'john.doe@.org'` throws an error.
### float

```js
const { float } = require('enotype');

float('42'); // returns 42.0
```

`'42'` returns `42.0`.  
`'-42'` returns `-42.0`.  
`'42.0'` returns `42.0`.  
`'42,0'` throws an error.  
`'4 2.0'` throws an error.  
`'fortytwo'` throws an error.
### integer

```js
const { integer } = require('enotype');

integer('42'); // returns 42
```

`'42'` returns `42`.  
`'-42'` returns `-42`.  
`'42.0'` throws an error.  
`'42,0'` throws an error.  
`'4 2'` throws an error.  
`'fortytwo'` throws an error.
### json

```js
const { json } = require('enotype');

json('{ "valid": true }'); // returns { valid: true }
```

`'{ "valid": true }'` returns `{ valid: true }`.  
`'42'` returns `42`.  
`'["valid", true]'` returns `['valid', true]`.  
`'invalid'` throws an error.  
`'{ invalid: true }'` throws an error.  
`'{ "invalid": true, }'` throws an error.
### latLng

```js
const { latLng } = require('enotype');

latLng('48.205870, 16.413690'); // returns { lat: 48.205870, lng: 16.413690 }
```

`'48.205870, 16.413690'` returns `{ lat: 48.205870, lng: 16.413690 }`.  
`'41.25, -120.9762'` returns `{ lat: 41.25, lng: -120.9762 }`.  
`'-31.96, 115.84'` returns `{ lat: -31.96, lng: 115.84 }`.  
`'90, 0'` returns `{ lat: 90, lng: 0 }`.  
`'   0   ,   0   '` returns `{ lat: 0, lng: 0 }`.  
`'-0,-0'` returns `{ lat: -0, lng: -0 }`.  
`'1000,10'` throws an error.  
`'10,1000'` throws an error.  
`'48.205870,'` throws an error.  
`', 16.413690'` throws an error.  
`'48,205870, 16,413690'` throws an error.
### slug

```js
const { slug } = require('enotype');

slug('eno-lang-article'); // returns 'eno-lang-article'
```

`'eno-lang-article'` returns `'eno-lang-article'`.  
`'eno_lang_article'` returns `'eno_lang_article'`.  
`'eno-lang-article!'` throws an error.  
`'%eno-lang-article'` throws an error.  
`'eno lang article'` throws an error.  
`'enö-läng-ärticle'` throws an error.  
`'énó-láng-ártíclé'` throws an error.
### url

```js
const { url } = require('enotype');

url('http://www.valid.com'); // returns 'http://www.valid.com'
```

`'http://www.valid.com'` returns `'http://www.valid.com'`.  
`'https://valid.com'` returns `'https://valid.com'`.  
`'https://www.valid.com'` returns `'https://www.valid.com'`.  
`'invalid'` throws an error.  
`'www.invalid'` throws an error.  
`'www.invalid.com'` throws an error.  
`'htp://www.invalid.com'` throws an error.  
`'http:/invalid.com'` throws an error.  
`'https//invalid.com'` throws an error.  
`'https://invalid'` throws an error.