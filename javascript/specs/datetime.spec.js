const { datetime } = require('..');

describe('datetime', () => {
  describe('with \'1990\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1990')).toEqual(new Date(Date.UTC(1990, 0, 1)));
    });
  });
  
  describe('with \'1991-01\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1991-01')).toEqual(new Date(Date.UTC(1991, 0, 1)));
    });
  });
  
  describe('with \'1992-02-02\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1992-02-02')).toEqual(new Date(Date.UTC(1992, 1, 2)));
    });
  });
  
  describe('with \'1993-03-03T19:20+01:00\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1993-03-03T19:20+01:00')).toEqual(new Date(Date.UTC(1993, 2, 3, 18, 20)));
    });
  });
  
  describe('with \'1994-04-04T19:20:30+01:00\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1994-04-04T19:20:30+01:00')).toEqual(new Date(Date.UTC(1994, 3, 4, 18, 20, 30)));
    });
  });
  
  describe('with \'1995-05-05T19:20:30.45+01:00\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1995-05-05T19:20:30.45+01:00')).toEqual(new Date(Date.UTC(1995, 4, 5, 18, 20, 30, 450)));
    });
  });
  
  describe('with \'1996-06-06T08:15:30-05:00\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1996-06-06T08:15:30-05:00')).toEqual(new Date(Date.UTC(1996, 5, 6, 13, 15, 30)));
    });
  });
  
  describe('with \'1997-07-07T13:15:30Z\'', () => {
    it('produces the expected result', () => {
      expect(datetime('1997-07-07T13:15:30Z')).toEqual(new Date(Date.UTC(1997, 6, 7, 13, 15, 30)));
    });
  });
  
  describe('with \'2002 12 14\'', () => {
    it('throws an error', () => {
      expect(() => datetime('2002 12 14')).toThrow();
    });
  });
  
  describe('with \'2002-12-14 20:15\'', () => {
    it('throws an error', () => {
      expect(() => datetime('2002-12-14 20:15')).toThrow();
    });
  });
  
  describe('with \'January\'', () => {
    it('throws an error', () => {
      expect(() => datetime('January')).toThrow();
    });
  });
  
  describe('with \'13:00\'', () => {
    it('throws an error', () => {
      expect(() => datetime('13:00')).toThrow();
    });
  });
});