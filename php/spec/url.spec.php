<?php declare(strict_types=1);

use Enotype\Loaders;

describe('url', function() {
  describe('with \'http://www.valid.com\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::url('http://www.valid.com'))->toEqual('http://www.valid.com');
    });
  });
  
  describe('with \'https://valid.com\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::url('https://valid.com'))->toEqual('https://valid.com');
    });
  });
  
  describe('with \'https://www.valid.com\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::url('https://www.valid.com'))->toEqual('https://www.valid.com');
    });
  });
  
  describe('with \'invalid\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('invalid'); })->toThrow();
    });
  });
  
  describe('with \'www.invalid\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('www.invalid'); })->toThrow();
    });
  });
  
  describe('with \'www.invalid.com\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('www.invalid.com'); })->toThrow();
    });
  });
  
  describe('with \'htp://www.invalid.com\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('htp://www.invalid.com'); })->toThrow();
    });
  });
  
  describe('with \'http:/invalid.com\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('http:/invalid.com'); })->toThrow();
    });
  });
  
  describe('with \'https//invalid.com\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('https//invalid.com'); })->toThrow();
    });
  });
  
  describe('with \'https://invalid\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::url('https://invalid'); })->toThrow();
    });
  });
});