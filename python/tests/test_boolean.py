import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import boolean

def test_0_true():
  assert boolean('true') is True

def test_1_false():
  assert boolean('false') is False

def test_2_yes():
  assert boolean('yes') is True

def test_3_no():
  assert boolean('no') is False

def test_4_nope():
  with pytest.raises(ValueError) as excinfo:
    boolean('nope')