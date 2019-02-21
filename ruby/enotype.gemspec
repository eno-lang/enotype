Gem::Specification.new do |spec|
  spec.add_development_dependency('rspec', '~> 3.8')
  spec.author = 'Simon Repp'
  spec.description = 'enotype is a collection of minimalist pure functions that validate and convert type-unsafe string representations into type-safe, native types.'
  spec.email = 'simon@fdpl.io'
  spec.files = `git ls-files -z lib LICENSE.txt README.md`.split("\0")
  spec.homepage = 'https://eno-lang.org/'
  spec.license = 'MIT'
  spec.name = 'enotype'
  spec.required_ruby_version = '>= 2.3.0'
  spec.summary = 'A cross-language standard library for types'
  spec.version = '0.1.0'
end
