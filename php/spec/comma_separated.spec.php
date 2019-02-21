<?php declare(strict_types=1);

use Enotype\Loaders;

describe('commaSeparated', function() {
  describe('with \'one,two,three\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated('one,two,three'))->toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \' one,two,three \'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated(' one,two,three '))->toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \'one , two , three\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated('one , two , three'))->toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \' one , two , three \'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated(' one , two , three '))->toEqual(['one', 'two', 'three']);
    });
  });
  
  describe('with \',,\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated(',,'))->toEqual(['', '', '']);
    });
  });
  
  describe('with \'one two three\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated('one two three'))->toEqual(['one two three']);
    });
  });
  
  describe('with \'one;two;three\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated('one;two;three'))->toEqual(['one;two;three']);
    });
  });
  
  describe('with \'   \'', function() {
    it('produces the expected result', function() {
      expect(Loaders::commaSeparated('   '))->toEqual(['']);
    });
  });
});