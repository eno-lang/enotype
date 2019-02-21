import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import float

def test_0_42():
  assert float('42') == 42.0

def test_1_42():
  assert float('-42') == -42.0

def test_2_42_0():
  assert float('42.0') == 42.0

def test_3_42_0():
  with pytest.raises(ValueError) as excinfo:
    float('42,0')

def test_4_4_2_0():
  with pytest.raises(ValueError) as excinfo:
    float('4 2.0')

def test_5_fortytwo():
  with pytest.raises(ValueError) as excinfo:
    float('fortytwo')