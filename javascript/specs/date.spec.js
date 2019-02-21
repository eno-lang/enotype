const { date } = require('..');

describe('date', () => {
  describe('with \'1992-02-02\'', () => {
    it('produces the expected result', () => {
      expect(date('1992-02-02')).toEqual(new Date(Date.UTC(1992, 1, 2)));
    });
  });
  
  describe('with \'1990\'', () => {
    it('throws an error', () => {
      expect(() => date('1990')).toThrow();
    });
  });
  
  describe('with \'1991-01\'', () => {
    it('throws an error', () => {
      expect(() => date('1991-01')).toThrow();
    });
  });
  
  describe('with \'1993-03-03T1920+01:00\'', () => {
    it('throws an error', () => {
      expect(() => date('1993-03-03T1920+01:00')).toThrow();
    });
  });
  
  describe('with \'1994-04-04T1920:30+01:00\'', () => {
    it('throws an error', () => {
      expect(() => date('1994-04-04T1920:30+01:00')).toThrow();
    });
  });
  
  describe('with \'1995-05-05T1920:30.45+01:00\'', () => {
    it('throws an error', () => {
      expect(() => date('1995-05-05T1920:30.45+01:00')).toThrow();
    });
  });
  
  describe('with \'1996-06-06T0815:30-05:00\'', () => {
    it('throws an error', () => {
      expect(() => date('1996-06-06T0815:30-05:00')).toThrow();
    });
  });
  
  describe('with \'1997-07-07T1315:30Z\'', () => {
    it('throws an error', () => {
      expect(() => date('1997-07-07T1315:30Z')).toThrow();
    });
  });
  
  describe('with \'2002 12 14\'', () => {
    it('throws an error', () => {
      expect(() => date('2002 12 14')).toThrow();
    });
  });
  
  describe('with \'2002-12-14 20:15\'', () => {
    it('throws an error', () => {
      expect(() => date('2002-12-14 20:15')).toThrow();
    });
  });
  
  describe('with \'January\'', () => {
    it('throws an error', () => {
      expect(() => date('January')).toThrow();
    });
  });
  
  describe('with \'13:00\'', () => {
    it('throws an error', () => {
      expect(() => date('13:00')).toThrow();
    });
  });
});