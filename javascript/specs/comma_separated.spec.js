const { commaSeparated } = require('..');

describe('commaSeparated', () => {
  describe('with \'one,two,three\'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated('one,two,three')).toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \' one,two,three \'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated(' one,two,three ')).toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \'one , two , three\'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated('one , two , three')).toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \' one , two , three \'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated(' one , two , three ')).toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \',,\'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated(',,')).toEqual(['', '', '']);
    });
  });
  
  describe('with \'one two three\'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated('one two three')).toEqual(['one two three']);
    });
  });
  
  describe('with \'one;two;three\'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated('one;two;three')).toEqual(['one;two;three']);
    });
  });
  
  describe('with \'   \'', () => {
    it('produces the expected result', () => {
      expect(commaSeparated('   ')).toEqual(['']);
    });
  });
});