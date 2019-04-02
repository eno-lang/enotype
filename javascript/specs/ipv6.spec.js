const { ipv6 } = require('..');

describe('ipv6', () => {
  describe('with \'::1\'', () => {
    it('produces the expected result', () => {
      expect(ipv6('::1')).toBe('::1');
    });
  });
  
  describe('with \'2001:db8::\'', () => {
    it('produces the expected result', () => {
      expect(ipv6('2001:db8::')).toBe('2001:db8::');
    });
  });
  
  describe('with \'0:0:0:0:0:0:0:0\'', () => {
    it('produces the expected result', () => {
      expect(ipv6('0:0:0:0:0:0:0:0')).toBe('0:0:0:0:0:0:0:0');
    });
  });
  
  describe('with \':::1\'', () => {
    it('throws an error', () => {
      expect(() => ipv6(':::1')).toThrow();
    });
  });
  
  describe('with \'::0::1\'', () => {
    it('throws an error', () => {
      expect(() => ipv6('::0::1')).toThrow();
    });
  });
  
  describe('with \'localhost\'', () => {
    it('throws an error', () => {
      expect(() => ipv6('localhost')).toThrow();
    });
  });
  
  describe('with \'0.0.0.0\'', () => {
    it('throws an error', () => {
      expect(() => ipv6('0.0.0.0')).toThrow();
    });
  });
});