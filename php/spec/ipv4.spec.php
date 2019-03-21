<?php declare(strict_types=1);

use Enotype\Loaders;

describe('ipv4', function() {
  describe('with \'0.0.0.0\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv4('0.0.0.0'))->toEqual('0.0.0.0');
    });
  });
  
  describe('with \'255.255.255.255\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv4('255.255.255.255'))->toEqual('255.255.255.255');
    });
  });
  
  describe('with \'192.168.0.1\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv4('192.168.0.1'))->toEqual('192.168.0.1');
    });
  });
  
  describe('with \'10.10.10.10\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::ipv4('10.10.10.10'))->toEqual('10.10.10.10');
    });
  });
  
  describe('with \'255.255.255.256\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv4('255.255.255.256'); })->toThrow();
    });
  });
  
  describe('with \'localhost\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv4('localhost'); })->toThrow();
    });
  });
  
  describe('with \'4.staging.production.lan\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::ipv4('4.staging.production.lan'); })->toThrow();
    });
  });
});