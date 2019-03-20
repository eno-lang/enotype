<?php declare(strict_types=1);

use Enotype\Loaders;

describe('slug', function() {
  describe('with \'eno-lang-article\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::slug('eno-lang-article'))->toEqual('eno-lang-article');
    });
  });
  
  describe('with \'eno_lang_article\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::slug('eno_lang_article'))->toEqual('eno_lang_article');
    });
  });
  
  describe('with \'eno-lang-article!\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::slug('eno-lang-article!'); })->toThrow();
    });
  });
  
  describe('with \'%eno-lang-article\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::slug('%eno-lang-article'); })->toThrow();
    });
  });
  
  describe('with \'eno lang article\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::slug('eno lang article'); })->toThrow();
    });
  });
  
  describe('with \'enö-läng-ärticle\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::slug('enö-läng-ärticle'); })->toThrow();
    });
  });
  
  describe('with \'énó-láng-ártíclé\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::slug('énó-láng-ártíclé'); })->toThrow();
    });
  });
});