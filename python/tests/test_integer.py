import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import integer

def test_0_42():
  assert integer('42') == 42

def test_1_42():
  assert integer('-42') == -42

def test_2_42_0():
  with pytest.raises(ValueError) as excinfo:
    integer('42.0')

def test_3_42_0():
  with pytest.raises(ValueError) as excinfo:
    integer('42,0')

def test_4_4_2():
  with pytest.raises(ValueError) as excinfo:
    integer('4 2')

def test_5_fortytwo():
  with pytest.raises(ValueError) as excinfo:
    integer('fortytwo')