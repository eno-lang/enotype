require 'enotype'

describe 'ipv4' do
  context 'with \'0.0.0.0\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv4('0.0.0.0')).to eq('0.0.0.0')
    end
  end
  
  context 'with \'255.255.255.255\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv4('255.255.255.255')).to eq('255.255.255.255')
    end
  end
  
  context 'with \'192.168.0.1\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv4('192.168.0.1')).to eq('192.168.0.1')
    end
  end
  
  context 'with \'10.10.10.10\'' do
    it 'produces the expected result' do
      expect(Enotype::ipv4('10.10.10.10')).to eq('10.10.10.10')
    end
  end
  
  context 'with \'255.255.255.256\'' do
    it 'raises an error' do
      expect { Enotype::ipv4('255.255.255.256') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'localhost\'' do
    it 'raises an error' do
      expect { Enotype::ipv4('localhost') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'4.staging.production.lan\'' do
    it 'raises an error' do
      expect { Enotype::ipv4('4.staging.production.lan') }.to raise_error(RuntimeError)
    end
  end
end