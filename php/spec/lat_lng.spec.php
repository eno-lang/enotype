<?php declare(strict_types=1);

use Enotype\Loaders;

describe('latLng', function() {
  describe('with \'48.205870, 16.413690\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::latLng('48.205870, 16.413690'))->toEqual([ 'lat' => 48.205870, 'lng' => 16.413690 ]);
    });
  });
  
  describe('with \'41.25, -120.9762\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::latLng('41.25, -120.9762'))->toEqual([ 'lat' => 41.25, 'lng' => -120.9762 ]);
    });
  });
  
  describe('with \'-31.96, 115.84\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::latLng('-31.96, 115.84'))->toEqual([ 'lat' => -31.96, 'lng' => 115.84 ]);
    });
  });
  
  describe('with \'90, 0\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::latLng('90, 0'))->toEqual([ 'lat' => 90, 'lng' => 0 ]);
    });
  });
  
  describe('with \'   0   ,   0   \'', function() {
    it('produces the expected result', function() {
      expect(Loaders::latLng('   0   ,   0   '))->toEqual([ 'lat' => 0, 'lng' => 0 ]);
    });
  });
  
  describe('with \'-0,-0\'', function() {
    it('produces the expected result', function() {
      expect(Loaders::latLng('-0,-0'))->toEqual([ 'lat' => -0, 'lng' => -0 ]);
    });
  });
  
  describe('with \'1000,10\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::latLng('1000,10'); })->toThrow();
    });
  });
  
  describe('with \'10,1000\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::latLng('10,1000'); })->toThrow();
    });
  });
  
  describe('with \'48.205870,\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::latLng('48.205870,'); })->toThrow();
    });
  });
  
  describe('with \', 16.413690\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::latLng(', 16.413690'); })->toThrow();
    });
  });
  
  describe('with \'48,205870, 16,413690\'', function() {
    it('throws an exception', function() {
      expect(function() { Loaders::latLng('48,205870, 16,413690'); })->toThrow();
    });
  });
});