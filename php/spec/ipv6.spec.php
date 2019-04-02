<?php declare(strict_types=1);

use Enotype\Loaders;

describe('ipv6', function() {
  describe('with \'::1\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv6('::1'))->toEqual('::1');
    });
  });
  
  describe('with \'2001:db8::\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv6('2001:db8::'))->toEqual('2001:db8::');
    });
  });
  
  describe('with \'0:0:0:0:0:0:0:0\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv6('0:0:0:0:0:0:0:0'))->toEqual('0:0:0:0:0:0:0:0');
    });
  });
  
  describe('with \':::1\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv6(':::1'); })->toThrow();
    });
  });
  
  describe('with \'::0::1\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv6('::0::1'); })->toThrow();
    });
  });
  
  describe('with \'localhost\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv6('localhost'); })->toThrow();
    });
  });
  
  describe('with \'0.0.0.0\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv6('0.0.0.0'); })->toThrow();
    });
  });
});