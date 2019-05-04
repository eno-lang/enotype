# enotype

**A cross-language type library**

```ruby
require 'enotype'

Enotype.color('#fff')  # returns "#fff"
Enotype.color('#xyz')  # raises "A color is required, for instance '#B6D918', '#fff' or '#01b'."
```

```ruby
require 'enotype/es'  # with localized error messages

Enotype.color('#xyz')  # raises "Se requiere un color, por ejemplo '#B6D918', '#fff' o '#01b'."
```

## Installation

Either add it to your `Gemfile`:

```ruby
gem 'enotype'
```

Or install it manually:

```
gem install enotype
```

## Features

- Validation and conversion of `string` representations into language-native types.
- Implemented as a collection of minimalist functions, so called *loaders*.
- Zero-cost localization (currently `de`, `en`, `es`) through statically generated code.
- Generically usable in a multitude of contexts through a plain and simple design.
- Standard type library for the [eno notation language](https://eno-lang.org).

## Documentation

### boolean

```ruby
require 'enotype'

Enotype.boolean('true') # returns true
```

`'true'` returns `true`.  
`'false'` returns `false`.  
`'yes'` returns `true`.  
`'no'` returns `false`.  
`'nope'` raises an exception.
### color

```ruby
require 'enotype'

Enotype.color('#abcdef') # returns '#abcdef'
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

```ruby
require 'enotype'

Enotype.comma_separated('one,two,three') # returns ['one', 'two', 'three']
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

```ruby
require 'enotype'

Enotype.date('1992-02-02') # returns Time.utc(1992, 2, 2)
```

`'1992-02-02'` returns `Time.utc(1992, 2, 2)`.  
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

```ruby
require 'enotype'

Enotype.datetime('1990') # returns Time.utc(1990, 1, 1)
```

`'1990'` returns `Time.utc(1990, 1, 1)`.  
`'1991-01'` returns `Time.utc(1991, 1, 1)`.  
`'1992-02-02'` returns `Time.utc(1992, 2, 2)`.  
`'1993-03-03T19:20+01:00'` returns `Time.utc(1993, 3, 3, 18, 20)`.  
`'1994-04-04T19:20:30+01:00'` returns `Time.new(1994, 4, 4, 19, 20, 30, '+01:00')`.  
`'1995-05-05T19:20:30.450+01:00'` returns `Time.new(1995, 5, 5, 19, 20, 30.450, '+01:00')`.  
`'1996-06-06T08:15:30-05:00'` returns `Time.new(1996, 6, 6, 8, 15, 30, '-05:00')`.  
`'1997-07-07T13:15:30Z'` returns `Time.utc(1997, 7, 7, 13, 15, 30)`.  
`'2002 12 14'` raises an exception.  
`'2002-12-14 20:15'` raises an exception.  
`'January'` raises an exception.  
`'13:00'` raises an exception.
### email

```ruby
require 'enotype'

Enotype.email('john.doe@eno-lang.org') # returns 'john.doe@eno-lang.org'
```

`'john.doe@eno-lang.org'` returns `'john.doe@eno-lang.org'`.  
`'john.doe@eno-lang'` raises an exception.  
`'@eno-lang.org'` raises an exception.  
`'john.doe@.org'` raises an exception.
### float

```ruby
require 'enotype'

Enotype.float('42') # returns 42.0
```

`'42'` returns `42.0`.  
`'-42'` returns `-42.0`.  
`'42.0'` returns `42.0`.  
`'42,0'` raises an exception.  
`'4 2.0'` raises an exception.  
`'fortytwo'` raises an exception.
### integer

```ruby
require 'enotype'

Enotype.integer('42') # returns 42
```

`'42'` returns `42`.  
`'-42'` returns `-42`.  
`'42.0'` raises an exception.  
`'42,0'` raises an exception.  
`'4 2'` raises an exception.  
`'fortytwo'` raises an exception.
### ipv4

```ruby
require 'enotype'

Enotype.ipv4('0.0.0.0') # returns '0.0.0.0'
```

`'0.0.0.0'` returns `'0.0.0.0'`.  
`'255.255.255.255'` returns `'255.255.255.255'`.  
`'192.168.0.1'` returns `'192.168.0.1'`.  
`'10.10.10.10'` returns `'10.10.10.10'`.  
`'255.255.255.256'` raises an exception.  
`'localhost'` raises an exception.  
`'4.staging.production.lan'` raises an exception.
### json

```ruby
require 'enotype'

Enotype.json('{ "valid": true }') # returns { 'valid' => true }
```

`'{ "valid": true }'` returns `{ 'valid' => true }`.  
`'42'` returns `42`.  
`'["valid", true]'` returns `['valid', true]`.  
`'invalid'` raises an exception.  
`'{ invalid: true }'` raises an exception.  
`'{ "invalid": true, }'` raises an exception.
### lat_lng

```ruby
require 'enotype'

Enotype.lat_lng('48.205870, 16.413690') # returns { lat: 48.205870, lng: 16.413690 }
```

`'48.205870, 16.413690'` returns `{ lat: 48.205870, lng: 16.413690 }`.  
`'41.25, -120.9762'` returns `{ lat: 41.25, lng: -120.9762 }`.  
`'-31.96, 115.84'` returns `{ lat: -31.96, lng: 115.84 }`.  
`'90, 0'` returns `{ lat: 90, lng: 0 }`.  
`'   0   ,   0   '` returns `{ lat: 0, lng: 0 }`.  
`'-0,-0'` returns `{ lat: -0, lng: -0 }`.  
`'1000,10'` raises an exception.  
`'10,1000'` raises an exception.  
`'48.205870,'` raises an exception.  
`', 16.413690'` raises an exception.  
`'48,205870, 16,413690'` raises an exception.
### slug

```ruby
require 'enotype'

Enotype.slug('eno-lang-article') # returns 'eno-lang-article'
```

`'eno-lang-article'` returns `'eno-lang-article'`.  
`'eno_lang_article'` returns `'eno_lang_article'`.  
`'eno-lang-article!'` raises an exception.  
`'%eno-lang-article'` raises an exception.  
`'eno lang article'` raises an exception.  
`'enö-läng-ärticle'` raises an exception.  
`'énó-láng-ártíclé'` raises an exception.
### url

```ruby
require 'enotype'

Enotype.url('http://www.valid.com') # returns 'http://www.valid.com'
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

### procs

Not a loader but a helper method to obtain some or all loaders wrapped in a
hash of procs, which allows to pass them around easily (this is mainly
intended for registering loaders with
[enolib](https://eno-lang.org/enolib)).

```ruby
require 'enotype'

# Get all loaders wrapped in a hash of procs
loaders = Enotype.procs
loaders[:boolean].call('true')  # returns true

# Get only the color and float loaders wrapped in a hash of procs
loaders = Enotype.procs(:color, :float)
loaders[:float].call('42.0')  # returns 42.0

# Registering loaders with enolib (main intended usage)
Enolib.register(Enotype.procs(:color, :float))
```