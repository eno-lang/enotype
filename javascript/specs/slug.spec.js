const { slug } = require('..');

describe('slug', () => {
  describe('with \'eno-lang-article\'', () => {
    it('produces the expected result', () => {
      expect(slug('eno-lang-article')).toBe('eno-lang-article');
    });
  });
  
  describe('with \'eno_lang_article\'', () => {
    it('produces the expected result', () => {
      expect(slug('eno_lang_article')).toBe('eno_lang_article');
    });
  });
  
  describe('with \'eno-lang-article!\'', () => {
    it('throws an error', () => {
      expect(() => slug('eno-lang-article!')).toThrow();
    });
  });
  
  describe('with \'%eno-lang-article\'', () => {
    it('throws an error', () => {
      expect(() => slug('%eno-lang-article')).toThrow();
    });
  });
  
  describe('with \'eno lang article\'', () => {
    it('throws an error', () => {
      expect(() => slug('eno lang article')).toThrow();
    });
  });
  
  describe('with \'enö-läng-ärticle\'', () => {
    it('throws an error', () => {
      expect(() => slug('enö-läng-ärticle')).toThrow();
    });
  });
  
  describe('with \'énó-láng-ártíclé\'', () => {
    it('throws an error', () => {
      expect(() => slug('énó-láng-ártíclé')).toThrow();
    });
  });
});