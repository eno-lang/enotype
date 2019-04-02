require 'enotype'

describe 'ipv6' do
  context 'with \'::1\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv6('::1')).to eq('::1')
    end
  end
  
  context 'with \'2001:db8::\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv6('2001:db8::')).to eq('2001:db8::')
    end
  end
  
  context 'with \'0:0:0:0:0:0:0:0\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv6('0:0:0:0:0:0:0:0')).to eq('0:0:0:0:0:0:0:0')
    end
  end
  
  context 'with \':::1\'' do
    it 'raises an error' do
      expect { Enotype::ipv6(':::1') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'::0::1\'' do
    it 'raises an error' do
      expect { Enotype::ipv6('::0::1') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'localhost\'' do
    it 'raises an error' do
      expect { Enotype::ipv6('localhost') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'0.0.0.0\'' do
    it 'raises an error' do
      expect { Enotype::ipv6('0.0.0.0') }.to raise_error(RuntimeError)
    end
  end
end