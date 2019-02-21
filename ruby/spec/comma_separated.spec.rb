require 'enotype'

describe 'comma_separated' do
  context 'with \'one,two,three\'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated('one,two,three')).to eq(['one', 'two', 'three'])
    end
  end
  
  context 'with \' one,two,three \'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated(' one,two,three ')).to eq(['one', 'two', 'three'])
    end
  end
  
  context 'with \'one , two , three\'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated('one , two , three')).to eq(['one', 'two', 'three'])
    end
  end
  
  context 'with \' one , two , three \'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated(' one , two , three ')).to eq(['one', 'two', 'three'])
    end
  end
  
  context 'with \',,\'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated(',,')).to eq(['', '', ''])
    end
  end
  
  context 'with \'one two three\'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated('one two three')).to eq(['one two three'])
    end
  end
  
  context 'with \'one;two;three\'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated('one;two;three')).to eq(['one;two;three'])
    end
  end
  
  context 'with \'   \'' do
    it 'produces the expected result' do
      expect(Enotype::comma_separated('   ')).to eq([''])
    end
  end
end