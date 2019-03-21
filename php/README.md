# enotype

**A cross-language type library**

```php
<?php

use Enotype\Loaders;

Loaders::color('#fff'); // returns "#fff"
Loaders::color('#xyz'); // throws Exception("A color is required, for instance '#B6D918', '#fff' or '#01b'.")
```

```php
<?php

use Enotype\Es\Loaders; // with localized error messages

Loaders::color('#xyz'); // throws Exception("Se requiere un color, por ejemplo '#B6D918', '#fff' o '#01b'.")
```

## Installation Notice

enotype for php is complete and fully-featured but not yet released on packagist because they don't support package publication from a multi-language monorepo (https://github.com/composer/packagist/issues/472). Please manually pull sources from github in the meanwhile - sorry for the inconvenience.

## Features

- Validation and conversion of `string` representations into language-native types.
- Implemented as a collection of minimalist functions, so called *loaders*.
- Zero-cost localization (currently `de`, `en`, `es`) through statically generated code.
- Generically usable in a multitude of contexts through a plain and simple design.
- Standard type library for the [eno notation language](https://eno-lang.org).

## Documentation

### boolean

```php
<?php

use Enotype\Loaders;

Loaders::boolean('true'); // returns true
```

`'true'` returns `true`.  
`'false'` returns `false`.  
`'yes'` returns `true`.  
`'no'` returns `false`.  
`'nope'` throws an error.
### color

```php
<?php

use Enotype\Loaders;

Loaders::color('#abcdef'); // returns '#abcdef'
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

```php
<?php

use Enotype\Loaders;

Loaders::commaSeparated('one,two,three'); // returns ['one', 'two', 'three']
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

```php
<?php

use Enotype\Loaders;

Loaders::date('1992-02-02'); // returns new DateTime('1992-02-02', new DateTimeZone('UTC'))
```

`'1992-02-02'` returns `new DateTime('1992-02-02', new DateTimeZone('UTC'))`.  
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

```php
<?php

use Enotype\Loaders;

Loaders::datetime('1990'); // returns new DateTime('1990-01-01', new DateTimeZone('UTC'))
```

`'1990'` returns `new DateTime('1990-01-01', new DateTimeZone('UTC'))`.  
`'1991-01'` returns `new DateTime('1991-01-01', new DateTimeZone('UTC'))`.  
`'1992-02-02'` returns `new DateTime('1992-02-02', new DateTimeZone('UTC'))`.  
`'1993-03-03T19:20+01:00'` returns `new DateTime('1993-03-03T19:20', new DateTimeZone('+0100'))`.  
`'1994-04-04T19:20:30+01:00'` returns `new DateTime('1994-04-04T19:20:30+0100', new DateTimeZone('+0100'))`.  
`'1995-05-05T19:20:30.45+01:00'` returns `new DateTime('1995-05-05T19:20:30.45', new DateTimeZone('+0100'))`.  
`'1996-06-06T08:15:30-05:00'` returns `new DateTime('1996-06-06T08:15:30', new DateTimeZone('-0500'))`.  
`'1997-07-07T13:15:30Z'` returns `new DateTime('1997-07-07T13:15:30', new DateTimeZone('UTC'))`.  
`'2002 12 14'` throws an error.  
`'2002-12-14 20:15'` throws an error.  
`'January'` throws an error.  
`'13:00'` throws an error.
### email

```php
<?php

use Enotype\Loaders;

Loaders::email('john.doe@eno-lang.org'); // returns 'john.doe@eno-lang.org'
```

`'john.doe@eno-lang.org'` returns `'john.doe@eno-lang.org'`.  
`'john.doe@eno-lang'` throws an error.  
`'@eno-lang.org'` throws an error.  
`'john.doe@.org'` throws an error.
### float

```php
<?php

use Enotype\Loaders;

Loaders::float('42'); // returns 42.0
```

`'42'` returns `42.0`.  
`'-42'` returns `-42.0`.  
`'42.0'` returns `42.0`.  
`'42,0'` throws an error.  
`'4 2.0'` throws an error.  
`'fortytwo'` throws an error.
### integer

```php
<?php

use Enotype\Loaders;

Loaders::integer('42'); // returns 42
```

`'42'` returns `42`.  
`'-42'` returns `-42`.  
`'42.0'` throws an error.  
`'42,0'` throws an error.  
`'4 2'` throws an error.  
`'fortytwo'` throws an error.
### ipv4

```php
<?php

use Enotype\Loaders;

Loaders::ipv4('0.0.0.0'); // returns '0.0.0.0'
```

`'0.0.0.0'` returns `'0.0.0.0'`.  
`'255.255.255.255'` returns `'255.255.255.255'`.  
`'192.168.0.1'` returns `'192.168.0.1'`.  
`'10.10.10.10'` returns `'10.10.10.10'`.  
`'255.255.255.256'` throws an error.  
`'localhost'` throws an error.  
`'4.staging.production.lan'` throws an error.
### json

```php
<?php

use Enotype\Loaders;

Loaders::json('{ "valid": true }'); // returns (object) [ 'valid' => true ]
```

`'{ "valid": true }'` returns `(object) [ 'valid' => true ]`.  
`'42'` returns `42`.  
`'["valid", true]'` returns `['valid', true]`.  
`'invalid'` throws an error.  
`'{ invalid: true }'` throws an error.  
`'{ "invalid": true, }'` throws an error.
### latLng

```php
<?php

use Enotype\Loaders;

Loaders::latLng('48.205870, 16.413690'); // returns [ 'lat' => 48.205870, 'lng' => 16.413690 ]
```

`'48.205870, 16.413690'` returns `[ 'lat' => 48.205870, 'lng' => 16.413690 ]`.  
`'41.25, -120.9762'` returns `[ 'lat' => 41.25, 'lng' => -120.9762 ]`.  
`'-31.96, 115.84'` returns `[ 'lat' => -31.96, 'lng' => 115.84 ]`.  
`'90, 0'` returns `[ 'lat' => 90, 'lng' => 0 ]`.  
`'   0   ,   0   '` returns `[ 'lat' => 0, 'lng' => 0 ]`.  
`'-0,-0'` returns `[ 'lat' => -0, 'lng' => -0 ]`.  
`'1000,10'` throws an error.  
`'10,1000'` throws an error.  
`'48.205870,'` throws an error.  
`', 16.413690'` throws an error.  
`'48,205870, 16,413690'` throws an error.
### slug

```php
<?php

use Enotype\Loaders;

Loaders::slug('eno-lang-article'); // returns 'eno-lang-article'
```

`'eno-lang-article'` returns `'eno-lang-article'`.  
`'eno_lang_article'` returns `'eno_lang_article'`.  
`'eno-lang-article!'` throws an error.  
`'%eno-lang-article'` throws an error.  
`'eno lang article'` throws an error.  
`'enö-läng-ärticle'` throws an error.  
`'énó-láng-ártíclé'` throws an error.
### url

```php
<?php

use Enotype\Loaders;

Loaders::url('http://www.valid.com'); // returns 'http://www.valid.com'
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