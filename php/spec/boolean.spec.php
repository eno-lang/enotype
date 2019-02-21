<?php declare(strict_types=1);

use Enotype\Loaders;

describe('boolean', function() {
  describe('with \'true\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::boolean('true'))->toBe(true);
    });
  });
  
  describe('with \'false\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::boolean('false'))->toBe(false);
    });
  });
  
  describe('with \'yes\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::boolean('yes'))->toBe(true);
    });
  });
  
  describe('with \'no\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::boolean('no'))->toBe(false);
    });
  });
  
  describe('with \'nope\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::boolean('nope'); })->toThrow();
    });
  });
});