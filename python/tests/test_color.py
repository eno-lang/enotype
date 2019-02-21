import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import color

def test_0_abcdef():
  assert color('#abcdef') == '#abcdef'

def test_1_abcdef():
  assert color('#ABCDEF') == '#ABCDEF'

def test_2_012345():
  assert color('#012345') == '#012345'

def test_3_678():
  assert color('#678') == '#678'

def test_4_89a():
  assert color('#89a') == '#89a'

def test_5_ab():
  with pytest.raises(ValueError) as excinfo:
    color('#ab')

def test_6_abcd():
  with pytest.raises(ValueError) as excinfo:
    color('#abcd')

def test_7_abcde():
  with pytest.raises(ValueError) as excinfo:
    color('#abcde')

def test_8_bcdefg():
  with pytest.raises(ValueError) as excinfo:
    color('#bcdefg')

def test_9_blue():
  with pytest.raises(ValueError) as excinfo:
    color('blue')