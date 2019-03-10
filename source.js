const enolib = require('enolib');
const glob = require('fast-glob');
const fs = require('fs');

const { TerminalReporter } = require('enolib');

const { escapeSingleQuotes } = require('./utilities.js');

const LANGUAGES = ['javascript', 'php', 'python', 'ruby'];
const LOCALES = ['de', 'en', 'es'];

module.exports = async () => {
  const blueprints = {
    languages: LANGUAGES,
    loaders: [],
    locales: LOCALES
  };

  for(const file of (await glob('blueprints/*.eno')).sort()) {
    const blueprint = enolib.parse(
      await fs.promises.readFile(file, 'utf-8'),
      { reporter: TerminalReporter, source: file }
    );

    const loader = {
      description: blueprint.field('description').requiredStringValue(),
      name: blueprint.field('name').requiredStringValue()
    };

    for(const language of blueprints.languages) {
      loader[language] = {
        prelude: blueprint.section('implementations').section(language).list('prelude').requiredStringValues()
      };

      const unlocalized = blueprint.section('implementations').section(language).field('code').requiredStringValue();

      for(let locale of blueprints.locales) {
        loader[language][locale] = unlocalized;

        for(let message of blueprint.section('messages').fieldsets()) {
          const placeholder = message.stringKey();
          const translation = message.entry(locale).requiredStringValue();

          // TODO: Escaping depends on quotes used, current solution to escape single quotes is unsafe assumption
          loader[language][locale] = loader[language][locale].replace(new RegExp(placeholder, 'g'), escapeSingleQuotes(translation));
        }
      }

      const specs = blueprint.section('implementations').section(language).optionalFieldset('specs');

      if(specs !== null) {
        loader[language].specs = {};

        for(let spec of specs.entries()) {
          const input = spec.stringKey();
          const expected = spec.optionalStringValue();

          loader[language].specs[input] = expected;
        }
      }
    }

    blueprint.assertAllTouched();

    blueprints.loaders.push(loader);
  }

  return blueprints;
};
