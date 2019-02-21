const { float } = require('..');

describe('float', () => {
  describe('with \'42\'', () => {
    it('produces the expected result', () => {
      expect(float('42')).toBe(42.0);
    });
  });
  
  describe('with \'-42\'', () => {
    it('produces the expected result', () => {
      expect(float('-42')).toBe(-42.0);
    });
  });
  
  describe('with \'42.0\'', () => {
    it('produces the expected result', () => {
      expect(float('42.0')).toBe(42.0);
    });
  });
  
  describe('with \'42,0\'', () => {
    it('throws an error', () => {
      expect(() => float('42,0')).toThrow();
    });
  });
  
  describe('with \'4 2.0\'', () => {
    it('throws an error', () => {
      expect(() => float('4 2.0')).toThrow();
    });
  });
  
  describe('with \'fortytwo\'', () => {
    it('throws an error', () => {
      expect(() => float('fortytwo')).toThrow();
    });
  });
});