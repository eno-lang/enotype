import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import url

def test_0_http_www_valid_com():
  assert url('http://www.valid.com') == 'http://www.valid.com'

def test_1_https_valid_com():
  assert url('https://valid.com') == 'https://valid.com'

def test_2_https_www_valid_com():
  assert url('https://www.valid.com') == 'https://www.valid.com'

def test_3_invalid():
  with pytest.raises(ValueError) as excinfo:
    url('invalid')

def test_4_www_invalid():
  with pytest.raises(ValueError) as excinfo:
    url('www.invalid')

def test_5_www_invalid_com():
  with pytest.raises(ValueError) as excinfo:
    url('www.invalid.com')

def test_6_htp_www_invalid_com():
  with pytest.raises(ValueError) as excinfo:
    url('htp://www.invalid.com')

def test_7_http_invalid_com():
  with pytest.raises(ValueError) as excinfo:
    url('http:/invalid.com')

def test_8_https_invalid_com():
  with pytest.raises(ValueError) as excinfo:
    url('https//invalid.com')

def test_9_https_invalid():
  with pytest.raises(ValueError) as excinfo:
    url('https://invalid')