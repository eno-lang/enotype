import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import enum

def test_0_true():
  assert enum('true') is True

def test_1_false():
  assert enum('false') is False

def test_2_yes():
  assert enum('yes') is True

def test_3_no():
  assert enum('no') is False

def test_4_nope():
  with pytest.raises(ValueError) as excinfo:
    enum('nope')