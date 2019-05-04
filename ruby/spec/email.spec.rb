require 'enotype'

describe 'email' do
  context 'with \'john.doe@eno-lang.org\'' do
    it 'produces the expected result' do
      expect(Enotype.email('john.doe@eno-lang.org')).to eq('john.doe@eno-lang.org')
    end
  end
  
  context 'with \'john.doe@eno-lang\'' do
    it 'raises an error' do
      expect { Enotype.email('john.doe@eno-lang') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'@eno-lang.org\'' do
    it 'raises an error' do
      expect { Enotype.email('@eno-lang.org') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'john.doe@.org\'' do
    it 'raises an error' do
      expect { Enotype.email('john.doe@.org') }.to raise_error(RuntimeError)
    end
  end
end