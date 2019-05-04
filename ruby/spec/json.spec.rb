require 'enotype'

describe 'json' do
  context 'with \'{ "valid": true }\'' do
    it 'produces the expected result' do
      expect(Enotype.json('{ "valid": true }')).to eq({ 'valid' => true })
    end
  end
  
  context 'with \'42\'' do
    it 'produces the expected result' do
      expect(Enotype.json('42')).to be(42)
    end
  end
  
  context 'with \'["valid", true]\'' do
    it 'produces the expected result' do
      expect(Enotype.json('["valid", true]')).to eq(['valid', true])
    end
  end
  
  context 'with \'invalid\'' do
    it 'raises an error' do
      expect { Enotype.json('invalid') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'{ invalid: true }\'' do
    it 'raises an error' do
      expect { Enotype.json('{ invalid: true }') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'{ "invalid": true, }\'' do
    it 'raises an error' do
      expect { Enotype.json('{ "invalid": true, }') }.to raise_error(RuntimeError)
    end
  end
end