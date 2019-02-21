const { latLng } = require('..');

describe('latLng', () => {
  describe('with \'48.205870, 16.413690\'', () => {
    it('produces the expected result', () => {
      expect(latLng('48.205870, 16.413690')).toEqual({ lat: 48.205870, lng: 16.413690 });
    });
  });
  
  describe('with \'41.25, -120.9762\'', () => {
    it('produces the expected result', () => {
      expect(latLng('41.25, -120.9762')).toEqual({ lat: 41.25, lng: -120.9762 });
    });
  });
  
  describe('with \'-31.96, 115.84\'', () => {
    it('produces the expected result', () => {
      expect(latLng('-31.96, 115.84')).toEqual({ lat: -31.96, lng: 115.84 });
    });
  });
  
  describe('with \'90, 0\'', () => {
    it('produces the expected result', () => {
      expect(latLng('90, 0')).toEqual({ lat: 90, lng: 0 });
    });
  });
  
  describe('with \'   0   ,   0   \'', () => {
    it('produces the expected result', () => {
      expect(latLng('   0   ,   0   ')).toEqual({ lat: 0, lng: 0 });
    });
  });
  
  describe('with \'-0,-0\'', () => {
    it('produces the expected result', () => {
      expect(latLng('-0,-0')).toEqual({ lat: -0, lng: -0 });
    });
  });
  
  describe('with \'1000,10\'', () => {
    it('throws an error', () => {
      expect(() => latLng('1000,10')).toThrow();
    });
  });
  
  describe('with \'10,1000\'', () => {
    it('throws an error', () => {
      expect(() => latLng('10,1000')).toThrow();
    });
  });
  
  describe('with \'48.205870,\'', () => {
    it('throws an error', () => {
      expect(() => latLng('48.205870,')).toThrow();
    });
  });
  
  describe('with \', 16.413690\'', () => {
    it('throws an error', () => {
      expect(() => latLng(', 16.413690')).toThrow();
    });
  });
  
  describe('with \'48,205870, 16,413690\'', () => {
    it('throws an error', () => {
      expect(() => latLng('48,205870, 16,413690')).toThrow();
    });
  });
});