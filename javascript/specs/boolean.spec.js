const { boolean } = require('..');

describe('boolean', () => {
  describe('with \'true\'', () => {
    it('produces the expected result', () => {
      expect(boolean('true')).toBe(true);
    });
  });
  
  describe('with \'false\'', () => {
    it('produces the expected result', () => {
      expect(boolean('false')).toBe(false);
    });
  });
  
  describe('with \'yes\'', () => {
    it('produces the expected result', () => {
      expect(boolean('yes')).toBe(true);
    });
  });
  
  describe('with \'no\'', () => {
    it('produces the expected result', () => {
      expect(boolean('no')).toBe(false);
    });
  });
  
  describe('with \'nope\'', () => {
    it('throws an error', () => {
      expect(() => boolean('nope')).toThrow();
    });
  });
});