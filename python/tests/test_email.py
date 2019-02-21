import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import email

def test_0_john_doe_eno_lang_org():
  assert email('john.doe@eno-lang.org') == 'john.doe@eno-lang.org'

def test_1_john_doe_eno_lang():
  with pytest.raises(ValueError) as excinfo:
    email('john.doe@eno-lang')

def test_2_eno_lang_org():
  with pytest.raises(ValueError) as excinfo:
    email('@eno-lang.org')

def test_3_john_doe_org():
  with pytest.raises(ValueError) as excinfo:
    email('john.doe@.org')