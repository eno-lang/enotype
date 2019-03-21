# enotype

**A cross-language type library**

```python
from enotype import color

color('#fff') # returns "#fff"
color('#xyz') # raises ValueError("A color is required, for instance '#B6D918', '#fff' or '#01b'.")
```

```python
from enotype.es import color # with localized error messages

color('#xyz') # raises ValueError("Se requiere un color, por ejemplo '#B6D918', '#fff' o '#01b'.")
```

## Installation

```
pip install enotype
```

## Features

- Validation and conversion of `string` representations into language-native types.
- Implemented as a collection of minimalist functions, so called *loaders*.
- Zero-cost localization (currently `de`, `en`, `es`) through statically generated code.
- Generically usable in a multitude of contexts through a plain and simple design.
- Standard type library for the [eno notation language](https://eno-lang.org).

## Documentation

### boolean

```python
import boolean from enotype

boolean('true') # returns True
```

`'true'` returns `True`.  
`'false'` returns `False`.  
`'yes'` returns `True`.  
`'no'` returns `False`.  
`'nope'` raises an exception.
### color

```python
import color from enotype

color('#abcdef') # returns '#abcdef'
```

`'#abcdef'` returns `'#abcdef'`.  
`'#ABCDEF'` returns `'#ABCDEF'`.  
`'#012345'` returns `'#012345'`.  
`'#678'` returns `'#678'`.  
`'#89a'` returns `'#89a'`.  
`'#ab'` raises an exception.  
`'#abcd'` raises an exception.  
`'#abcde'` raises an exception.  
`'#bcdefg'` raises an exception.  
`'blue'` raises an exception.
### comma_separated

```python
import comma_separated from enotype

comma_separated('one,two,three') # returns ['one', 'two', 'three']
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

```python
import date from enotype

date('1992-02-02') # returns python_date(1992, 2, 2)
```

`'1992-02-02'` returns `python_date(1992, 2, 2)`.  
`'1990'` raises an exception.  
`'1991-01'` raises an exception.  
`'1993-03-03T1920+01:00'` raises an exception.  
`'1994-04-04T1920:30+01:00'` raises an exception.  
`'1995-05-05T1920:30.45+01:00'` raises an exception.  
`'1996-06-06T0815:30-05:00'` raises an exception.  
`'1997-07-07T1315:30Z'` raises an exception.  
`'2002 12 14'` raises an exception.  
`'2002-12-14 20:15'` raises an exception.  
`'January'` raises an exception.  
`'13:00'` raises an exception.
### datetime

```python
import datetime from enotype

datetime('1990') # returns python_datetime.strptime('1990-01-01T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')
```

`'1990'` returns `python_datetime.strptime('1990-01-01T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1991-01'` returns `python_datetime.strptime('1991-01-01T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1992-02-02'` returns `python_datetime.strptime('1992-02-02T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1993-03-03T19:20+01:00'` returns `python_datetime.strptime('1993-03-03T18:20:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1994-04-04T19:20:30+01:00'` returns `python_datetime.strptime('1994-04-04T18:20:30.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1995-05-05T19:20:30.45+01:00'` returns `python_datetime.strptime('1995-05-05T18:20:30.450+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1996-06-06T08:15:30-05:00'` returns `python_datetime.strptime('1996-06-06T08:15:30.000-0500', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'1997-07-07T13:15:30Z'` returns `python_datetime.strptime('1997-07-07T13:15:30.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')`.  
`'2002 12 14'` raises an exception.  
`'2002-12-14 20:15'` raises an exception.  
`'January'` raises an exception.  
`'13:00'` raises an exception.
### email

```python
import email from enotype

email('john.doe@eno-lang.org') # returns 'john.doe@eno-lang.org'
```

`'john.doe@eno-lang.org'` returns `'john.doe@eno-lang.org'`.  
`'john.doe@eno-lang'` raises an exception.  
`'@eno-lang.org'` raises an exception.  
`'john.doe@.org'` raises an exception.
### float

```python
import float from enotype

float('42') # returns 42.0
```

`'42'` returns `42.0`.  
`'-42'` returns `-42.0`.  
`'42.0'` returns `42.0`.  
`'42,0'` raises an exception.  
`'4 2.0'` raises an exception.  
`'fortytwo'` raises an exception.
### integer

```python
import integer from enotype

integer('42') # returns 42
```

`'42'` returns `42`.  
`'-42'` returns `-42`.  
`'42.0'` raises an exception.  
`'42,0'` raises an exception.  
`'4 2'` raises an exception.  
`'fortytwo'` raises an exception.
### ipv4

```python
import ipv4 from enotype

ipv4('0.0.0.0') # returns '0.0.0.0'
```

`'0.0.0.0'` returns `'0.0.0.0'`.  
`'255.255.255.255'` returns `'255.255.255.255'`.  
`'192.168.0.1'` returns `'192.168.0.1'`.  
`'10.10.10.10'` returns `'10.10.10.10'`.  
`'255.255.255.256'` raises an exception.  
`'localhost'` raises an exception.  
`'4.staging.production.lan'` raises an exception.
### json

```python
import json from enotype

json('{ "valid": true }') # returns { 'valid': True }
```

`'{ "valid": true }'` returns `{ 'valid': True }`.  
`'42'` returns `42`.  
`'["valid", true]'` returns `['valid', True]`.  
`'invalid'` raises an exception.  
`'{ invalid: true }'` raises an exception.  
`'{ "invalid": true, }'` raises an exception.
### lat_lng

```python
import lat_lng from enotype

lat_lng('48.205870, 16.413690') # returns { 'lat': 48.205870, 'lng': 16.413690 }
```

`'48.205870, 16.413690'` returns `{ 'lat': 48.205870, 'lng': 16.413690 }`.  
`'41.25, -120.9762'` returns `{ 'lat': 41.25, 'lng': -120.9762 }`.  
`'-31.96, 115.84'` returns `{ 'lat': -31.96, 'lng': 115.84 }`.  
`'90, 0'` returns `{ 'lat': 90, 'lng': 0 }`.  
`'   0   ,   0   '` returns `{ 'lat': 0, 'lng': 0 }`.  
`'-0,-0'` returns `{ 'lat': -0, 'lng': -0 }`.  
`'1000,10'` raises an exception.  
`'10,1000'` raises an exception.  
`'48.205870,'` raises an exception.  
`', 16.413690'` raises an exception.  
`'48,205870, 16,413690'` raises an exception.
### slug

```python
import slug from enotype

slug('eno-lang-article') # returns 'eno-lang-article'
```

`'eno-lang-article'` returns `'eno-lang-article'`.  
`'eno_lang_article'` returns `'eno_lang_article'`.  
`'eno-lang-article!'` raises an exception.  
`'%eno-lang-article'` raises an exception.  
`'eno lang article'` raises an exception.  
`'enö-läng-ärticle'` raises an exception.  
`'énó-láng-ártíclé'` raises an exception.
### url

```python
import url from enotype

url('http://www.valid.com') # returns 'http://www.valid.com'
```

`'http://www.valid.com'` returns `'http://www.valid.com'`.  
`'https://valid.com'` returns `'https://valid.com'`.  
`'https://www.valid.com'` returns `'https://www.valid.com'`.  
`'invalid'` raises an exception.  
`'www.invalid'` raises an exception.  
`'www.invalid.com'` raises an exception.  
`'htp://www.invalid.com'` raises an exception.  
`'http:/invalid.com'` raises an exception.  
`'https//invalid.com'` raises an exception.  
`'https://invalid'` raises an exception.