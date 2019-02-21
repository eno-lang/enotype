import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import json

def test_0_valid_true():
  assert json('{ "valid": true }') == { 'valid': True }

def test_1_42():
  assert json('42') == 42

def test_2_valid_true():
  assert json('["valid", true]') == ['valid', True]

def test_3_invalid():
  with pytest.raises(ValueError) as excinfo:
    json('invalid')

def test_4_invalid_true():
  with pytest.raises(ValueError) as excinfo:
    json('{ invalid: true }')

def test_5_invalid_true():
  with pytest.raises(ValueError) as excinfo:
    json('{ "invalid": true, }')