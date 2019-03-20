const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const { filenamify, interpolatify } = require('../utilities.js');

module.exports = async blueprints => {
  await fsExtra.emptyDir(path.join(__dirname, '../python/enotype'));

  const imports = `from .en import ${blueprints.loaders.map(loader => loader.name).join(', ')}`;
  await fs.promises.writeFile(path.join(__dirname, '../python/enotype/__init__.py'), imports);

  await fsExtra.emptyDir(path.join(__dirname, '../python/tests'));
  await fs.promises.writeFile(path.join(__dirname, '../python/tests/__init__.py'), '');

  for(const locale of blueprints.locales) {
    const imports = [];
    const prelude = [];
    let loaders = [];

    for(const loader of blueprints.loaders) {
      for(const instruction of loader.python.prelude) {
        if(instruction.match(/^(import|from) /)) {
          if(!imports.includes(instruction)) {
            imports.push(instruction);
          }
        } else {
          if(!prelude.includes(instruction)) {
            prelude.push(instruction);
          }
        }
      }

      loaders.push(loader.python[locale]);
    }

    const code = (imports.length > 0 ? imports.join('\n') + '\n\n' : '') +
                 (prelude.length > 0 ? prelude.join('\n') + '\n\n' : '') +
                 loaders.join('\n\n');

    await fs.promises.writeFile(path.join(__dirname, `../python/enotype/${locale}.py`), code);
  }

  for(const loader of blueprints.loaders) {
    if(!loader.python.hasOwnProperty('specs'))
      continue;

    const scenarios = [];
    let id = 0;
    for(const [input, expected] of Object.entries(loader.python.specs)) {
      let expectation;
      if(expected) {
        const matcher = expected.match(/^(False|None|True)/) ? 'is' : '==';
        expectation = `assert ${loader.name}(${input}) ${matcher} ${expected}`;
      } else {
        // TODO: str(excinfo.value) could be used for examining the message
        expectation = interpolatify`
          with pytest.raises(ValueError) as excinfo:
            ${loader.name}(${input})
        `;
      }

      scenarios.push(interpolatify`
        def test_${id++}_${filenamify(input)}():
          ${expectation}
      `);
    }

    const code = interpolatify`
      import pytest
      from datetime import date as python_date, datetime as python_datetime
      from enotype import ${loader.name}

      ${scenarios.join('\n\n')}
    `;

    await fs.promises.writeFile(path.join(__dirname, `../python/tests/test_${loader.name}.py`), code);

  }
}
