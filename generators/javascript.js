const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const { camelCase, escapeSingleQuotes, interpolatify } = require('../utilities.js');

module.exports = async blueprints => {
  await fsExtra.emptyDir(path.join(__dirname, '../javascript/lib'));
  await fsExtra.emptyDir(path.join(__dirname, '../javascript/specs'));

  for(let locale of blueprints.locales) {
    const code = blueprints.loaders.map(loader =>
      `exports.${camelCase(loader.name)} = ${loader.javascript[locale]};`
    ).join('\n\n');

    await fs.promises.writeFile(path.join(__dirname, `../javascript/lib/${locale}.js`), code);
  }

  for(let loader of blueprints.loaders) {
    if(!loader.javascript.hasOwnProperty('specs'))
      continue;

    const scenarios = [];
    for(let [input, expected] of Object.entries(loader.javascript.specs)) {
      if(expected) {
        const primitive = expected.match(/^([!`'"+\-1-9]|false|null|true|undefined)/);
        scenarios.push(interpolatify`
          describe('with ${escapeSingleQuotes(input)}', () => {
            it('produces the expected result', () => {
              expect(${camelCase(loader.name)}(${input})).to${primitive ? 'Be' : 'Equal'}(${expected});
            });
          });
        `);
      } else {
        // TODO: Support for asserting the error message as well
        scenarios.push(interpolatify`
          describe('with ${escapeSingleQuotes(input)}', () => {
            it('throws an error', () => {
              expect(() => ${camelCase(loader.name)}(${input})).toThrow();
            });
          });
        `);
      }
    }

    const code = interpolatify`
      const { ${camelCase(loader.name)} } = require('..');

      describe('${camelCase(loader.name)}', () => {
        ${scenarios.join('\n\n')}
      });
    `;

    await fs.promises.writeFile(path.join(__dirname, `../javascript/specs/${loader.name}.spec.js`), code);
  }
}
