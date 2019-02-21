require 'enotype'

describe 'color' do
  context 'with \'#abcdef\'' do
    it 'produces the expected result' do
      expect(Enotype::color('#abcdef')).to eq('#abcdef')
    end
  end
  
  context 'with \'#ABCDEF\'' do
    it 'produces the expected result' do
      expect(Enotype::color('#ABCDEF')).to eq('#ABCDEF')
    end
  end
  
  context 'with \'#012345\'' do
    it 'produces the expected result' do
      expect(Enotype::color('#012345')).to eq('#012345')
    end
  end
  
  context 'with \'#678\'' do
    it 'produces the expected result' do
      expect(Enotype::color('#678')).to eq('#678')
    end
  end
  
  context 'with \'#89a\'' do
    it 'produces the expected result' do
      expect(Enotype::color('#89a')).to eq('#89a')
    end
  end
  
  context 'with \'#ab\'' do
    it 'raises an error' do
      expect { Enotype::color('#ab') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'#abcd\'' do
    it 'raises an error' do
      expect { Enotype::color('#abcd') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'#abcde\'' do
    it 'raises an error' do
      expect { Enotype::color('#abcde') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'#bcdefg\'' do
    it 'raises an error' do
      expect { Enotype::color('#bcdefg') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'blue\'' do
    it 'raises an error' do
      expect { Enotype::color('blue') }.to raise_error(RuntimeError)
    end
  end
end