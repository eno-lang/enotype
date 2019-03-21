const { ipv4 } = require('..');

describe('ipv4', () => {
  describe('with \'0.0.0.0\'', () => {
    it('produces the expected result', () => {
      expect(ipv4('0.0.0.0')).toBe('0.0.0.0');
    });
  });
  
  describe('with \'255.255.255.255\'', () => {
    it('produces the expected result', () => {
      expect(ipv4('255.255.255.255')).toBe('255.255.255.255');
    });
  });
  
  describe('with \'192.168.0.1\'', () => {
    it('produces the expected result', () => {
      expect(ipv4('192.168.0.1')).toBe('192.168.0.1');
    });
  });
  
  describe('with \'10.10.10.10\'', () => {
    it('produces the expected result', () => {
      expect(ipv4('10.10.10.10')).toBe('10.10.10.10');
    });
  });
  
  describe('with \'255.255.255.256\'', () => {
    it('throws an error', () => {
      expect(() => ipv4('255.255.255.256')).toThrow();
    });
  });
  
  describe('with \'localhost\'', () => {
    it('throws an error', () => {
      expect(() => ipv4('localhost')).toThrow();
    });
  });
  
  describe('with \'4.staging.production.lan\'', () => {
    it('throws an error', () => {
      expect(() => ipv4('4.staging.production.lan')).toThrow();
    });
  });
});