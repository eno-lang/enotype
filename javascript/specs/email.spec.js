const { email } = require('..');

describe('email', () => {
  describe('with \'john.doe@eno-lang.org\'', () => {
    it('produces the expected result', () => {
      expect(email('john.doe@eno-lang.org')).toBe('john.doe@eno-lang.org');
    });
  });
  
  describe('with \'john.doe@eno-lang\'', () => {
    it('throws an error', () => {
      expect(() => email('john.doe@eno-lang')).toThrow();
    });
  });
  
  describe('with \'@eno-lang.org\'', () => {
    it('throws an error', () => {
      expect(() => email('@eno-lang.org')).toThrow();
    });
  });
  
  describe('with \'john.doe@.org\'', () => {
    it('throws an error', () => {
      expect(() => email('john.doe@.org')).toThrow();
    });
  });
});