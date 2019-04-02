import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import ipv6

def test_0_1():
  assert ipv6('::1') == '::1'

def test_1_2001_db8():
  assert ipv6('2001:db8::') == '2001:db8::'

def test_2_0_0_0_0_0_0_0_0():
  assert ipv6('0:0:0:0:0:0:0:0') == '0:0:0:0:0:0:0:0'

def test_3_1():
  with pytest.raises(ValueError) as excinfo:
    ipv6(':::1')

def test_4_0_1():
  with pytest.raises(ValueError) as excinfo:
    ipv6('::0::1')

def test_5_localhost():
  with pytest.raises(ValueError) as excinfo:
    ipv6('localhost')

def test_6_0_0_0_0():
  with pytest.raises(ValueError) as excinfo:
    ipv6('0.0.0.0')