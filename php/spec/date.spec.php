<?php declare(strict_types=1);

use Enotype\Loaders;

describe('date', function() {
  describe('with \'1992-02-02\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::date('1992-02-02'))->toEqual(new DateTime('1992-02-02', new DateTimeZone('UTC')));
    });
  });
  
  describe('with \'1990\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1990'); })->toThrow();
    });
  });
  
  describe('with \'1991-01\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1991-01'); })->toThrow();
    });
  });
  
  describe('with \'1993-03-03T1920+01:00\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1993-03-03T1920+01:00'); })->toThrow();
    });
  });
  
  describe('with \'1994-04-04T1920:30+01:00\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1994-04-04T1920:30+01:00'); })->toThrow();
    });
  });
  
  describe('with \'1995-05-05T1920:30.45+01:00\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1995-05-05T1920:30.45+01:00'); })->toThrow();
    });
  });
  
  describe('with \'1996-06-06T0815:30-05:00\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1996-06-06T0815:30-05:00'); })->toThrow();
    });
  });
  
  describe('with \'1997-07-07T1315:30Z\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('1997-07-07T1315:30Z'); })->toThrow();
    });
  });
  
  describe('with \'2002 12 14\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('2002 12 14'); })->toThrow();
    });
  });
  
  describe('with \'2002-12-14 20:15\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('2002-12-14 20:15'); })->toThrow();
    });
  });
  
  describe('with \'January\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('January'); })->toThrow();
    });
  });
  
  describe('with \'13:00\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::date('13:00'); })->toThrow();
    });
  });
});