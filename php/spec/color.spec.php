<?php declare(strict_types=1);

use Enotype\Loaders;

describe('color', function() {
  describe('with \'#abcdef\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::color('#abcdef'))->toEqual('#abcdef');
    });
  });
  
  describe('with \'#ABCDEF\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::color('#ABCDEF'))->toEqual('#ABCDEF');
    });
  });
  
  describe('with \'#012345\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::color('#012345'))->toEqual('#012345');
    });
  });
  
  describe('with \'#678\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::color('#678'))->toEqual('#678');
    });
  });
  
  describe('with \'#89a\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::color('#89a'))->toEqual('#89a');
    });
  });
  
  describe('with \'#ab\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::color('#ab'); })->toThrow();
    });
  });
  
  describe('with \'#abcd\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::color('#abcd'); })->toThrow();
    });
  });
  
  describe('with \'#abcde\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::color('#abcde'); })->toThrow();
    });
  });
  
  describe('with \'#bcdefg\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::color('#bcdefg'); })->toThrow();
    });
  });
  
  describe('with \'blue\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::color('blue'); })->toThrow();
    });
  });
});