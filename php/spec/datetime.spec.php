<?php declare(strict_types=1);

use Enotype\Loaders;

describe('datetime', function() {
  describe('with \'1990\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1990'))->toEqual(new DateTime('1990-01-01', new DateTimeZone('UTC')));
    });
  });
  
  describe('with \'1991-01\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1991-01'))->toEqual(new DateTime('1991-01-01', new DateTimeZone('UTC')));
    });
  });
  
  describe('with \'1992-02-02\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1992-02-02'))->toEqual(new DateTime('1992-02-02', new DateTimeZone('UTC')));
    });
  });
  
  describe('with \'1993-03-03T19:20+01:00\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1993-03-03T19:20+01:00'))->toEqual(new DateTime('1993-03-03T19:20', new DateTimeZone('+0100')));
    });
  });
  
  describe('with \'1994-04-04T19:20:30+01:00\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1994-04-04T19:20:30+01:00'))->toEqual(new DateTime('1994-04-04T19:20:30+0100', new DateTimeZone('+0100')));
    });
  });
  
  describe('with \'1995-05-05T19:20:30.45+01:00\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1995-05-05T19:20:30.45+01:00'))->toEqual(new DateTime('1995-05-05T19:20:30.45', new DateTimeZone('+0100')));
    });
  });
  
  describe('with \'1996-06-06T08:15:30-05:00\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1996-06-06T08:15:30-05:00'))->toEqual(new DateTime('1996-06-06T08:15:30', new DateTimeZone('-0500')));
    });
  });
  
  describe('with \'1997-07-07T13:15:30Z\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::datetime('1997-07-07T13:15:30Z'))->toEqual(new DateTime('1997-07-07T13:15:30', new DateTimeZone('UTC')));
    });
  });
  
  describe('with \'2002 12 14\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::datetime('2002 12 14'); })->toThrow();
    });
  });
  
  describe('with \'2002-12-14 20:15\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::datetime('2002-12-14 20:15'); })->toThrow();
    });
  });
  
  describe('with \'January\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::datetime('January'); })->toThrow();
    });
  });
  
  describe('with \'13:00\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::datetime('13:00'); })->toThrow();
    });
  });
});