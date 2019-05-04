require 'enotype'

describe '::procs' do
  it 'returns all loaders as a hash of procs' do
    expect(Enotype.procs.length).to eq(13)
  end

  it 'returns actual loaders' do
    expect(Enotype.procs[:boolean].call('true')).to be true
  end

  context 'requesting explicit loaders' do
    it 'only returns those specified' do
      loaders = Enotype.procs(:color, :float)

      expect(loaders.length).to eq(2)
      expect(loaders.include?(:color)).to be true
      expect(loaders.include?(:float)).to be true
    end
  end
end