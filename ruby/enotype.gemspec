Gem::Specification.new do |spec|
  spec.add_development_dependency('rspec', '~> 3.8')
  spec.author = 'Simon Repp'
  spec.description = 'A cross-language type library'
  spec.email = 'simon@fdpl.io'
  spec.files = `git ls-files -z lib LICENSE.txt README.md`.split("\0")
  spec.homepage = 'https://eno-lang.org/enotype/'
  spec.license = 'MIT'
  spec.metadata = {
    'bug_tracker_uri' => 'https://github.com/eno-lang/enotype/issues',
    'changelog_uri'=> 'https://github.com/eno-lang/enotype/blob/master/CHANGELOG.md',
    'documentation_uri' => 'https://eno-lang.org/enotype/',
    'homepage_uri' => 'https://eno-lang.org/enotype/',
    'source_code_uri' => 'https://github.com/eno-lang/enotype/'
  }
  spec.name = 'enotype'
  spec.required_ruby_version = '>= 2.4.0'
  spec.summary = 'A cross-language type library'
  spec.version = '0.3.0'
end
