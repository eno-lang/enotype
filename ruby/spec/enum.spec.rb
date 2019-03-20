require 'enotype'

describe 'enum' do
  context 'with \'true\'' do
    it 'produces the expected result' do
      expect(Enotype::enum('true')).to be(true)
    end
  end
  
  context 'with \'false\'' do
    it 'produces the expected result' do
      expect(Enotype::enum('false')).to be(false)
    end
  end
  
  context 'with \'yes\'' do
    it 'produces the expected result' do
      expect(Enotype::enum('yes')).to be(true)
    end
  end
  
  context 'with \'no\'' do
    it 'produces the expected result' do
      expect(Enotype::enum('no')).to be(false)
    end
  end
  
  context 'with \'nope\'' do
    it 'raises an error' do
      expect { Enotype::enum('nope') }.to raise_error(RuntimeError)
    end
  end
end