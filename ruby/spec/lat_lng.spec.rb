require 'enotype'

describe 'lat_lng' do
  context 'with \'48.205870, 16.413690\'' do
    it 'produces the expected result' do
      expect(Enotype.lat_lng('48.205870, 16.413690')).to eq({ lat: 48.205870, lng: 16.413690 })
    end
  end
  
  context 'with \'41.25, -120.9762\'' do
    it 'produces the expected result' do
      expect(Enotype.lat_lng('41.25, -120.9762')).to eq({ lat: 41.25, lng: -120.9762 })
    end
  end
  
  context 'with \'-31.96, 115.84\'' do
    it 'produces the expected result' do
      expect(Enotype.lat_lng('-31.96, 115.84')).to eq({ lat: -31.96, lng: 115.84 })
    end
  end
  
  context 'with \'90, 0\'' do
    it 'produces the expected result' do
      expect(Enotype.lat_lng('90, 0')).to eq({ lat: 90, lng: 0 })
    end
  end
  
  context 'with \'   0   ,   0   \'' do
    it 'produces the expected result' do
      expect(Enotype.lat_lng('   0   ,   0   ')).to eq({ lat: 0, lng: 0 })
    end
  end
  
  context 'with \'-0,-0\'' do
    it 'produces the expected result' do
      expect(Enotype.lat_lng('-0,-0')).to eq({ lat: -0, lng: -0 })
    end
  end
  
  context 'with \'1000,10\'' do
    it 'raises an error' do
      expect { Enotype.lat_lng('1000,10') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'10,1000\'' do
    it 'raises an error' do
      expect { Enotype.lat_lng('10,1000') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'48.205870,\'' do
    it 'raises an error' do
      expect { Enotype.lat_lng('48.205870,') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \', 16.413690\'' do
    it 'raises an error' do
      expect { Enotype.lat_lng(', 16.413690') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'48,205870, 16,413690\'' do
    it 'raises an error' do
      expect { Enotype.lat_lng('48,205870, 16,413690') }.to raise_error(RuntimeError)
    end
  end
end