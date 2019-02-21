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
      for(let instruction of loader.ruby.prelude) {
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
            expect(Enotype::${loader.name}(${input})).to ${matcher}(${expected})
          end
        `;
      } else {
        expectation = interpolatify`
          it 'raises an error' do
            expect { Enotype::${loader.name}(${input}) }.to raise_error(RuntimeError)
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
}
