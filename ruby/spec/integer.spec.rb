require 'enotype'

describe 'integer' do
  context 'with \'42\'' do
    it 'produces the expected result' do
      expect(Enotype::integer('42')).to be(42)
    end
  end
  
  context 'with \'-42\'' do
    it 'produces the expected result' do
      expect(Enotype::integer('-42')).to be(-42)
    end
  end
  
  context 'with \'42.0\'' do
    it 'raises an error' do
      expect { Enotype::integer('42.0') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'42,0\'' do
    it 'raises an error' do
      expect { Enotype::integer('42,0') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'4 2\'' do
    it 'raises an error' do
      expect { Enotype::integer('4 2') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'fortytwo\'' do
    it 'raises an error' do
      expect { Enotype::integer('fortytwo') }.to raise_error(RuntimeError)
    end
  end
end