require 'enotype'

describe 'date' do
  context 'with \'1992-02-02\'' do
    it 'produces the expected result' do
      expect(Enotype.date('1992-02-02')).to eq(Time.utc(1992, 2, 2))
    end
  end
  
  context 'with \'1990\'' do
    it 'raises an error' do
      expect { Enotype.date('1990') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'1991-01\'' do
    it 'raises an error' do
      expect { Enotype.date('1991-01') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'1993-03-03T1920+01:00\'' do
    it 'raises an error' do
      expect { Enotype.date('1993-03-03T1920+01:00') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'1994-04-04T1920:30+01:00\'' do
    it 'raises an error' do
      expect { Enotype.date('1994-04-04T1920:30+01:00') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'1995-05-05T1920:30.45+01:00\'' do
    it 'raises an error' do
      expect { Enotype.date('1995-05-05T1920:30.45+01:00') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'1996-06-06T0815:30-05:00\'' do
    it 'raises an error' do
      expect { Enotype.date('1996-06-06T0815:30-05:00') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'1997-07-07T1315:30Z\'' do
    it 'raises an error' do
      expect { Enotype.date('1997-07-07T1315:30Z') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'2002 12 14\'' do
    it 'raises an error' do
      expect { Enotype.date('2002 12 14') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'2002-12-14 20:15\'' do
    it 'raises an error' do
      expect { Enotype.date('2002-12-14 20:15') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'January\'' do
    it 'raises an error' do
      expect { Enotype.date('January') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'13:00\'' do
    it 'raises an error' do
      expect { Enotype.date('13:00') }.to raise_error(RuntimeError)
    end
  end
end