require 'enotype'

describe 'boolean' do
  context 'with \'true\'' do
    it 'produces the expected result' do
      expect(Enotype.boolean('true')).to be(true)
    end
  end
  
  context 'with \'false\'' do
    it 'produces the expected result' do
      expect(Enotype.boolean('false')).to be(false)
    end
  end
  
  context 'with \'yes\'' do
    it 'produces the expected result' do
      expect(Enotype.boolean('yes')).to be(true)
    end
  end
  
  context 'with \'no\'' do
    it 'produces the expected result' do
      expect(Enotype.boolean('no')).to be(false)
    end
  end
  
  context 'with \'nope\'' do
    it 'raises an error' do
      expect { Enotype.boolean('nope') }.to raise_error(RuntimeError)
    end
  end
end