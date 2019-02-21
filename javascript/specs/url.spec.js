const { url } = require('..');

describe('url', () => {
  describe('with \'http://www.valid.com\'', () => {
    it('produces the expected result', () => {
      expect(url('http://www.valid.com')).toBe('http://www.valid.com');
    });
  });
  
  describe('with \'https://valid.com\'', () => {
    it('produces the expected result', () => {
      expect(url('https://valid.com')).toBe('https://valid.com');
    });
  });
  
  describe('with \'https://www.valid.com\'', () => {
    it('produces the expected result', () => {
      expect(url('https://www.valid.com')).toBe('https://www.valid.com');
    });
  });
  
  describe('with \'invalid\'', () => {
    it('throws an error', () => {
      expect(() => url('invalid')).toThrow();
    });
  });
  
  describe('with \'www.invalid\'', () => {
    it('throws an error', () => {
      expect(() => url('www.invalid')).toThrow();
    });
  });
  
  describe('with \'www.invalid.com\'', () => {
    it('throws an error', () => {
      expect(() => url('www.invalid.com')).toThrow();
    });
  });
  
  describe('with \'htp://www.invalid.com\'', () => {
    it('throws an error', () => {
      expect(() => url('htp://www.invalid.com')).toThrow();
    });
  });
  
  describe('with \'http:/invalid.com\'', () => {
    it('throws an error', () => {
      expect(() => url('http:/invalid.com')).toThrow();
    });
  });
  
  describe('with \'https//invalid.com\'', () => {
    it('throws an error', () => {
      expect(() => url('https//invalid.com')).toThrow();
    });
  });
  
  describe('with \'https://invalid\'', () => {
    it('throws an error', () => {
      expect(() => url('https://invalid')).toThrow();
    });
  });
});