const javascript = require('./generators/javascript.js');
const php = require('./generators/php.js');
const python = require('./generators/python.js');
const ruby = require('./generators/ruby.js');
const source = require('./source.js');

const generate = async () => {
  const blueprints = await source();

  await javascript(blueprints);
  await php(blueprints);
  await python(blueprints);
  await ruby(blueprints);
};

generate();
