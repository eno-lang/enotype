const { integer } = require('..');

describe('integer', () => {
  describe('with \'42\'', () => {
    it('produces the expected result', () => {
      expect(integer('42')).toBe(42);
    });
  });
  
  describe('with \'-42\'', () => {
    it('produces the expected result', () => {
      expect(integer('-42')).toBe(-42);
    });
  });
  
  describe('with \'42.0\'', () => {
    it('throws an error', () => {
      expect(() => integer('42.0')).toThrow();
    });
  });
  
  describe('with \'42,0\'', () => {
    it('throws an error', () => {
      expect(() => integer('42,0')).toThrow();
    });
  });
  
  describe('with \'4 2\'', () => {
    it('throws an error', () => {
      expect(() => integer('4 2')).toThrow();
    });
  });
  
  describe('with \'fortytwo\'', () => {
    it('throws an error', () => {
      expect(() => integer('fortytwo')).toThrow();
    });
  });
});