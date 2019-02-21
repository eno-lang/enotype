const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const { camelCase, escapeSingleQuotes, interpolatify, titleCase } = require('../utilities.js');

module.exports = async blueprints => {
  await fsExtra.emptyDir(path.join(__dirname, '../php/spec'));
  await fsExtra.emptyDir(path.join(__dirname, '../php/src'));

  for(const locale of blueprints.locales) {
    const classPrelude = [];
    const usePrelude = [];
    let loaders = [];

    for(const loader of blueprints.loaders) {
      for(const instruction of loader.php.prelude) {
        if(instruction.startsWith('use')) {
          if(!usePrelude.includes(instruction)) {
            usePrelude.push(instruction);
          }
        } else {
          if(!classPrelude.includes(instruction)) {
            classPrelude.push(instruction);
          }
        }
      }

      loaders.push(loader.php[locale]);
    }

    const code = interpolatify`
      <?php declare(strict_types=1);

      namespace Enotype\\${titleCase(locale)};
      ${usePrelude.length > 0 ? usePrelude.join('\n') : ''}

      class Loaders {
        ${classPrelude.length > 0 ? classPrelude.join('\n') : ''}

        ${loaders.join('\n\n')}
      }
    `;

    if(locale === 'en') {
      await fs.promises.writeFile(path.join(__dirname, '../php/src/Loaders.php'), code.replace('Enotype\\En;', 'Enotype;'));
    }

    await fs.promises.mkdir(path.join(__dirname, `../php/src/${titleCase(locale)}`));
    await fs.promises.writeFile(path.join(__dirname, `../php/src/${titleCase(locale)}/Loaders.php`), code);
  }

  for(let loader of blueprints.loaders) {
    if(!loader.php.hasOwnProperty('specs'))
      continue;

    const scenarios = [];
    for(const [input, expected] of Object.entries(loader.php.specs)) {
      let expectation;

      if(expected) {
        const  matcher = expected.match(/^([!+\-1-9]|false|null|true)/) ? 'Be' : 'Equal';

        expectation = interpolatify`
          it('produces the expected result', function() {
            expect(Loaders::${camelCase(loader.name)}(${input}))->to${matcher}(${expected});
          });
        `;
      } else {
        expectation = interpolatify`
          it('throws an exception', function() {
            expect(function() { Loaders::${camelCase(loader.name)}(${input}); })->toThrow();
          });
        `;
      }

      scenarios.push(interpolatify`
        describe('with ${escapeSingleQuotes(input)}', function() {
          ${expectation}
        });
      `);
    }

    const code = interpolatify`
      <?php declare(strict_types=1);

      use Enotype\\Loaders;

      describe('${camelCase(loader.name)}', function() {
        ${scenarios.join('\n\n')}
      });
    `;

    await fs.promises.writeFile(path.join(__dirname, `../php/spec/${loader.name}.spec.php`), code);
  }
}
