const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const { escapeSingleQuotes, interpolatify } = require('../utilities.js');

module.exports = async blueprints => {
  await fsExtra.emptyDir(path.join(__dirname, '../ruby/lib/enotype'));
  await fs.promises.writeFile(path.join(__dirname, '../ruby/lib/enotype.rb'), `require 'enotype/en'`);

  await fsExtra.emptyDir(path.join(__dirname, '../ruby/spec'));

  const specHelper = interpolatify`
    RSpec.configure do |config|
      config.pattern = '**/*.spec.rb'
      config.warnings = true
    end
  `;

  await fs.promises.writeFile(path.join(__dirname, '../ruby/spec/spec_helper.rb'), specHelper);

  for(const locale of blueprints.locales) {
    const requires = [];
    const prelude = [];
    const loaders = [];

    for(const loader of blueprints.loaders) {
      for(const instruction of loader.ruby.prelude) {
        if(instruction.startsWith('require ')) {
          if(!requires.includes(instruction)) {
            requires.push(instruction);
          }
        } else {
          if(!prelude.includes(instruction)) {
            prelude.push(instruction);
          }
        }
      }

      loaders.push(loader.ruby[locale]);
    }

    const code = interpolatify`
      ${requires.length > 0 ? requires.join('\n') + '\n' : ''}
      ${prelude.length > 0 ? prelude.join('\n') : ''}

      module Enotype
        ${loaders.join('\n\n')}

        def self.procs(*explicitly_requested)
          available = self.singleton_methods.reject { |name| name == :procs }

          if explicitly_requested.empty?
            available.to_h do |name|
              [name, Proc.new { |value| self.send(name, value) }]
            end
          else
            explicitly_requested.to_h do |name|
              unless available.include?(name)
                list = available.map { |name| ":#{name}" }.join(', ')
                raise "Enotype does not provide :#{name}, available are: #{list}"
              end

              [name, Proc.new { |value| self.send(name, value) }]
            end
          end
        end
      end
    `;

    await fs.promises.writeFile(path.join(__dirname, `../ruby/lib/enotype/${locale}.rb`), code);
  }

  for(const loader of blueprints.loaders) {
    if(!loader.ruby.hasOwnProperty('specs'))
      continue;

    const scenarios = [];
    for(let [input, expected] of Object.entries(loader.ruby.specs)) {
      let expectation;
      if(expected) {
        const matcher = expected.match(/^([!+\-1-9]|false|nil|true)/) ? 'be' : 'eq';

        expectation = interpolatify`
          it 'produces the expected result' do
            expect(Enotype.${loader.name}(${input})).to ${matcher}(${expected})
          end
        `;
      } else {
        expectation = interpolatify`
          it 'raises an error' do
            expect { Enotype.${loader.name}(${input}) }.to raise_error(RuntimeError)
          end
        `;
      }

      // TODO: Also need to escape backslash for the context label, here and elsewhere
      scenarios.push(interpolatify`
        context 'with ${escapeSingleQuotes(input)}' do
          ${expectation}
        end
      `);
    }

    const code = interpolatify`
      require 'enotype'

      describe '${loader.name}' do
        ${scenarios.join('\n\n')}
      end
    `;

    await fs.promises.writeFile(path.join(__dirname, `../ruby/spec/${loader.name}.spec.rb`), code);
  }

  // Generate global spec for procs

  const code = interpolatify`
    require 'enotype'

    describe '::procs' do
      it 'returns all loaders as a hash of procs' do
        expect(Enotype.procs.length).to eq(${blueprints.loaders.length})
      end

      it 'returns actual loaders' do
        expect(Enotype.procs[:boolean].call('true')).to be true
      end

      context 'requesting explicit loaders' do
        it 'only returns those specified' do
          loaders = Enotype.procs(:color, :float)

          expect(loaders.length).to eq(2)
          expect(loaders.include?(:color)).to be true
          expect(loaders.include?(:float)).to be true
        end
      end
    end
  `;

  await fs.promises.writeFile(path.join(__dirname, `../ruby/spec/procs.spec.rb`), code);

  // Generate readme

  const readme = interpolatify`
    ${blueprints.readme.global.replace('CODE_DEMO', blueprints.readme.ruby)
                              .replace('CURRENT_LOCALES', blueprints.locales.map(locale => `\`${locale}\``).join(', '))}

    ## Documentation

    ${blueprints.loaders.map(loader => interpolatify`
      ### ${loader.name}

      \`\`\`ruby
      require 'enotype'

      Enotype.${loader.name}(${Object.keys(loader.ruby.specs)[0]}) # returns ${Object.values(loader.ruby.specs)[0]}
      \`\`\`

      ${Object.entries(loader.ruby.specs).map(([input, expected]) => interpolatify`
        \`${input}\` ${expected === null ? 'raises an exception.' : `returns \`${expected}\`.`}
      `).join('  \n')}
    `).join('\n')}

    ### procs

    Not a loader but a helper method to obtain some or all loaders wrapped in a
    hash of procs, which allows to pass them around easily (this is mainly
    intended for registering loaders with
    [enolib](https://eno-lang.org/enolib)).

    \`\`\`ruby
    require 'enotype'

    # Get all loaders wrapped in a hash of procs
    loaders = Enotype.procs
    loaders[:boolean].call('true')  # returns true

    # Get only the color and float loaders wrapped in a hash of procs
    loaders = Enotype.procs(:color, :float)
    loaders[:float].call('42.0')  # returns 42.0

    # Registering loaders with enolib (main intended usage)
    Enolib.register(Enotype.procs(:color, :float))
    \`\`\`
  `;

  await fs.promises.writeFile(path.join(__dirname, `../ruby/README.md`), readme);
}
