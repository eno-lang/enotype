const fs = require('fs');

const javascript = require('./generators/javascript.js');
const php = require('./generators/php.js');
const python = require('./generators/python.js');
const ruby = require('./generators/ruby.js');
const source = require('./source.js');

const { interpolatify } = require('./utilities.js');

const generate = async () => {
  const blueprints = await source();

  await javascript(blueprints);
  await php(blueprints);
  await python(blueprints);
  await ruby(blueprints);

  const readme = interpolatify`
    ${blueprints.readme.global.replace('CODE_DEMO', 'Available for JavaScript, PHP, Python and Ruby.')
                              .replace('CURRENT_LOCALES', blueprints.locales.map(locale => `\`${locale}\``).join(', '))}

    ## Documentation

    Visit the language subfolders in this repository for language-specific documentation.
  `;

  await fs.promises.writeFile('README.md', readme);
};

generate();
