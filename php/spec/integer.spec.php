<?php declare(strict_types=1);

use Enotype\Loaders;

describe('integer', function() {
  describe('with \'42\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::integer('42'))->toBe(42);
    });
  });
  
  describe('with \'-42\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::integer('-42'))->toBe(-42);
    });
  });
  
  describe('with \'42.0\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::integer('42.0'); })->toThrow();
    });
  });
  
  describe('with \'42,0\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::integer('42,0'); })->toThrow();
    });
  });
  
  describe('with \'4 2\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::integer('4 2'); })->toThrow();
    });
  });
  
  describe('with \'fortytwo\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::integer('fortytwo'); })->toThrow();
    });
  });
});