const { enum } = require('..');

describe('enum', () => {
  describe('with \'eno\'', () => {
    it('produces the expected result', () => {
      expect(enum('eno')).toBe('eno');
    });
  });
  
  describe('with \'json\'', () => {
    it('produces the expected result', () => {
      expect(enum('json')).toBe('json');
    });
  });
  
  describe('with \'yaml\'', () => {
    it('produces the expected result', () => {
      expect(enum('yaml')).toBe('yaml');
    });
  });
  
  describe('with \'YAML\'', () => {
    it('throws an error', () => {
      expect(() => enum('YAML')).toThrow();
    });
  });
  
  describe('with \'car\'', () => {
    it('throws an error', () => {
      expect(() => enum('car')).toThrow();
    });
  });
  
  describe('with \'13\'', () => {
    it('throws an error', () => {
      expect(() => enum('13')).toThrow();
    });
  });
});