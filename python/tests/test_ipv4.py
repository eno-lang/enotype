import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import ipv4

def test_0_0_0_0_0():
  assert ipv4('0.0.0.0') == '0.0.0.0'

def test_1_255_255_255_255():
  assert ipv4('255.255.255.255') == '255.255.255.255'

def test_2_192_168_0_1():
  assert ipv4('192.168.0.1') == '192.168.0.1'

def test_3_10_10_10_10():
  assert ipv4('10.10.10.10') == '10.10.10.10'

def test_4_255_255_255_256():
  with pytest.raises(ValueError) as excinfo:
    ipv4('255.255.255.256')

def test_5_localhost():
  with pytest.raises(ValueError) as excinfo:
    ipv4('localhost')

def test_6_4_staging_production_lan():
  with pytest.raises(ValueError) as excinfo:
    ipv4('4.staging.production.lan')