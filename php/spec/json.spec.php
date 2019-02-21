<?php declare(strict_types=1);

use Enotype\Loaders;

describe('json', function() {
  describe('with \'{ "valid": true }\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::json('{ "valid": true }'))->toEqual((object) [ 'valid' => true ]);
    });
  });
  
  describe('with \'42\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::json('42'))->toBe(42);
    });
  });
  
  describe('with \'["valid", true]\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::json('["valid", true]'))->toEqual(['valid', true]);
    });
  });
  
  describe('with \'invalid\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::json('invalid'); })->toThrow();
    });
  });
  
  describe('with \'{ invalid: true }\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::json('{ invalid: true }'); })->toThrow();
    });
  });
  
  describe('with \'{ "invalid": true, }\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::json('{ "invalid": true, }'); })->toThrow();
    });
  });
});