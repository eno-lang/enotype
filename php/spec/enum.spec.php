<?php declare(strict_types=1);

use Enotype\Loaders;

describe('enum', function() {
  describe('with \'true\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::enum('true'))->toBe(true);
    });
  });
  
  describe('with \'false\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::enum('false'))->toBe(false);
    });
  });
  
  describe('with \'yes\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::enum('yes'))->toBe(true);
    });
  });
  
  describe('with \'no\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::enum('no'))->toBe(false);
    });
  });
  
  describe('with \'nope\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::enum('nope'); })->toThrow();
    });
  });
});