const { color } = require('..');

describe('color', () => {
  describe('with \'#abcdef\'', () => {
    it('produces the expected result', () => {
      expect(color('#abcdef')).toBe('#abcdef');
    });
  });
  
  describe('with \'#ABCDEF\'', () => {
    it('produces the expected result', () => {
      expect(color('#ABCDEF')).toBe('#ABCDEF');
    });
  });
  
  describe('with \'#012345\'', () => {
    it('produces the expected result', () => {
      expect(color('#012345')).toBe('#012345');
    });
  });
  
  describe('with \'#678\'', () => {
    it('produces the expected result', () => {
      expect(color('#678')).toBe('#678');
    });
  });
  
  describe('with \'#89a\'', () => {
    it('produces the expected result', () => {
      expect(color('#89a')).toBe('#89a');
    });
  });
  
  describe('with \'#ab\'', () => {
    it('throws an error', () => {
      expect(() => color('#ab')).toThrow();
    });
  });
  
  describe('with \'#abcd\'', () => {
    it('throws an error', () => {
      expect(() => color('#abcd')).toThrow();
    });
  });
  
  describe('with \'#abcde\'', () => {
    it('throws an error', () => {
      expect(() => color('#abcde')).toThrow();
    });
  });
  
  describe('with \'#bcdefg\'', () => {
    it('throws an error', () => {
      expect(() => color('#bcdefg')).toThrow();
    });
  });
  
  describe('with \'blue\'', () => {
    it('throws an error', () => {
      expect(() => color('blue')).toThrow();
    });
  });
});