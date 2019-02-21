require 'enotype'

describe 'float' do
  context 'with \'42\'' do
    it 'produces the expected result' do
      expect(Enotype::float('42')).to be(42.0)
    end
  end
  
  context 'with \'-42\'' do
    it 'produces the expected result' do
      expect(Enotype::float('-42')).to be(-42.0)
    end
  end
  
  context 'with \'42.0\'' do
    it 'produces the expected result' do
      expect(Enotype::float('42.0')).to be(42.0)
    end
  end
  
  context 'with \'42,0\'' do
    it 'raises an error' do
      expect { Enotype::float('42,0') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'4 2.0\'' do
    it 'raises an error' do
      expect { Enotype::float('4 2.0') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'fortytwo\'' do
    it 'raises an error' do
      expect { Enotype::float('fortytwo') }.to raise_error(RuntimeError)
    end
  end
end