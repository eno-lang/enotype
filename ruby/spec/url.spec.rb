require 'enotype'

describe 'url' do
  context 'with \'http://www.valid.com\'' do
    it 'produces the expected result' do
      expect(Enotype::url('http://www.valid.com')).to eq('http://www.valid.com')
    end
  end
  
  context 'with \'https://valid.com\'' do
    it 'produces the expected result' do
      expect(Enotype::url('https://valid.com')).to eq('https://valid.com')
    end
  end
  
  context 'with \'https://www.valid.com\'' do
    it 'produces the expected result' do
      expect(Enotype::url('https://www.valid.com')).to eq('https://www.valid.com')
    end
  end
  
  context 'with \'invalid\'' do
    it 'raises an error' do
      expect { Enotype::url('invalid') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'www.invalid\'' do
    it 'raises an error' do
      expect { Enotype::url('www.invalid') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'www.invalid.com\'' do
    it 'raises an error' do
      expect { Enotype::url('www.invalid.com') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'htp://www.invalid.com\'' do
    it 'raises an error' do
      expect { Enotype::url('htp://www.invalid.com') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'http:/invalid.com\'' do
    it 'raises an error' do
      expect { Enotype::url('http:/invalid.com') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'https//invalid.com\'' do
    it 'raises an error' do
      expect { Enotype::url('https//invalid.com') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'https://invalid\'' do
    it 'raises an error' do
      expect { Enotype::url('https://invalid') }.to raise_error(RuntimeError)
    end
  end
end