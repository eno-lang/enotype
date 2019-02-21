require 'enotype'

describe 'datetime' do
  context 'with \'1990\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1990')).to eq(Time.utc(1990, 1, 1))
    end
  end
  
  context 'with \'1991-01\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1991-01')).to eq(Time.utc(1991, 1, 1))
    end
  end
  
  context 'with \'1992-02-02\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1992-02-02')).to eq(Time.utc(1992, 2, 2))
    end
  end
  
  context 'with \'1993-03-03T19:20+01:00\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1993-03-03T19:20+01:00')).to eq(Time.utc(1993, 3, 3, 18, 20))
    end
  end
  
  context 'with \'1994-04-04T19:20:30+01:00\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1994-04-04T19:20:30+01:00')).to eq(Time.new(1994, 4, 4, 19, 20, 30, '+01:00'))
    end
  end
  
  context 'with \'1995-05-05T19:20:30.450+01:00\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1995-05-05T19:20:30.450+01:00')).to eq(Time.new(1995, 5, 5, 19, 20, 30.450, '+01:00'))
    end
  end
  
  context 'with \'1996-06-06T08:15:30-05:00\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1996-06-06T08:15:30-05:00')).to eq(Time.new(1996, 6, 6, 8, 15, 30, '-05:00'))
    end
  end
  
  context 'with \'1997-07-07T13:15:30Z\'' do
    it 'produces the expected result' do
      expect(Enotype::datetime('1997-07-07T13:15:30Z')).to eq(Time.utc(1997, 7, 7, 13, 15, 30))
    end
  end
  
  context 'with \'2002 12 14\'' do
    it 'raises an error' do
      expect { Enotype::datetime('2002 12 14') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'2002-12-14 20:15\'' do
    it 'raises an error' do
      expect { Enotype::datetime('2002-12-14 20:15') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'January\'' do
    it 'raises an error' do
      expect { Enotype::datetime('January') }.to raise_error(RuntimeError)
    end
  end
  
  context 'with \'13:00\'' do
    it 'raises an error' do
      expect { Enotype::datetime('13:00') }.to raise_error(RuntimeError)
    end
  end
end