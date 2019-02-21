# enotype

**A cross-language standard library for types.**

```ruby
require 'enotype'

Enotype::color('#fff') # returns '#fff'
Enotype::color('#xyz') # raises 'A color is required, for instance '#B6D918', '#fff' or '#01b'.'
```

enotype is a collection of minimalist pure functions that validate and convert type-unsafe `string` representations into type-safe, native types.

It is the standard type library for the [eno notation language](https://eno-lang.org) but can be utilized in a multitude of other contexts as well.