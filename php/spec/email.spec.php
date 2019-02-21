<?php declare(strict_types=1);

use Enotype\Loaders;

describe('email', function() {
  describe('with \'john.doe@eno-lang.org\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::email('john.doe@eno-lang.org'))->toEqual('john.doe@eno-lang.org');
    });
  });
  
  describe('with \'john.doe@eno-lang\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::email('john.doe@eno-lang'); })->toThrow();
    });
  });
  
  describe('with \'@eno-lang.org\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::email('@eno-lang.org'); })->toThrow();
    });
  });
  
  describe('with \'john.doe@.org\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::email('john.doe@.org'); })->toThrow();
    });
  });
});