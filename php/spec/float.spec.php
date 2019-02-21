<?php declare(strict_types=1);

use Enotype\Loaders;

describe('float', function() {
  describe('with \'42\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::float('42'))->toBe(42.0);
    });
  });
  
  describe('with \'-42\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::float('-42'))->toBe(-42.0);
    });
  });
  
  describe('with \'42.0\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::float('42.0'))->toBe(42.0);
    });
  });
  
  describe('with \'42,0\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::float('42,0'); })->toThrow();
    });
  });
  
  describe('with \'4 2.0\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::float('4 2.0'); })->toThrow();
    });
  });
  
  describe('with \'fortytwo\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::float('fortytwo'); })->toThrow();
    });
  });
});