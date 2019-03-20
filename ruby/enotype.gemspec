Gem::Specification.new do |spec|
  spec.add_development_dependency('rspec', '~> 3.8')
  spec.author = 'Simon Repp'
  spec.description = 'Validation and conversion of `string` representations into language-native types'
  spec.email = 'simon@fdpl.io'
  spec.files = `git ls-files -z lib LICENSE.txt README.md`.split("\0")
  spec.homepage = 'https://eno-lang.org/enotype/'
  spec.license = 'MIT'
  spec.name = 'enotype'
  spec.required_ruby_version = '>= 2.3.0'
  spec.summary = 'A cross-language type library'
  spec.version = '0.2.0'
end
