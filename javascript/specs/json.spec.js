const { json } = require('..');

describe('json', () => {
  describe('with \'{ "valid": true }\'', () => {
    it('produces the expected result', () => {
      expect(json('{ "valid": true }')).toEqual({ valid: true });
    });
  });
  
  describe('with \'42\'', () => {
    it('produces the expected result', () => {
      expect(json('42')).toBe(42);
    });
  });
  
  describe('with \'["valid", true]\'', () => {
    it('produces the expected result', () => {
      expect(json('["valid", true]')).toEqual(['valid', true]);
    });
  });
  
  describe('with \'invalid\'', () => {
    it('throws an error', () => {
      expect(() => json('invalid')).toThrow();
    });
  });
  
  describe('with \'{ invalid: true }\'', () => {
    it('throws an error', () => {
      expect(() => json('{ invalid: true }')).toThrow();
    });
  });
  
  describe('with \'{ "invalid": true, }\'', () => {
    it('throws an error', () => {
      expect(() => json('{ "invalid": true, }')).toThrow();
    });
  });
});