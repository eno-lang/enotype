require 'enotype'

describe 'slug' do
  context 'with \'eno-lang-article\'' do
    it 'produces the expected result' do
      expect(Enotype::slug('eno-lang-article')).to eq('eno-lang-article')
    end
  end
  
  context 'with \'eno_lang_article\'' do
    it 'produces the expected result' do
      expect(Enotype::slug('eno_lang_article')).to eq('eno_lang_article')
    end
  end
  
  context 'with \'eno-lang-article!\'' do
    it 'raises an error' do
      expect { Enotype::slug('eno-lang-article!') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'%eno-lang-article\'' do
    it 'raises an error' do
      expect { Enotype::slug('%eno-lang-article') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'eno lang article\'' do
    it 'raises an error' do
      expect { Enotype::slug('eno lang article') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'enö-läng-ärticle\'' do
    it 'raises an error' do
      expect { Enotype::slug('enö-läng-ärticle') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'énó-láng-ártíclé\'' do
    it 'raises an error' do
      expect { Enotype::slug('énó-láng-ártíclé') }.to raise_error(RuntimeError)
    end
  end
end