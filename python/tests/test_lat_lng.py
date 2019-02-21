import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import lat_lng

def test_0_48_205870_16_413690():
  assert lat_lng('48.205870, 16.413690') == { 'lat': 48.205870, 'lng': 16.413690 }

def test_1_41_25_120_9762():
  assert lat_lng('41.25, -120.9762') == { 'lat': 41.25, 'lng': -120.9762 }

def test_2_31_96_115_84():
  assert lat_lng('-31.96, 115.84') == { 'lat': -31.96, 'lng': 115.84 }

def test_3_90_0():
  assert lat_lng('90, 0') == { 'lat': 90, 'lng': 0 }

def test_4_0_0():
  assert lat_lng('   0   ,   0   ') == { 'lat': 0, 'lng': 0 }

def test_5_0_0():
  assert lat_lng('-0,-0') == { 'lat': -0, 'lng': -0 }

def test_6_1000_10():
  with pytest.raises(ValueError) as excinfo:
    lat_lng('1000,10')

def test_7_10_1000():
  with pytest.raises(ValueError) as excinfo:
    lat_lng('10,1000')

def test_8_48_205870():
  with pytest.raises(ValueError) as excinfo:
    lat_lng('48.205870,')

def test_9_16_413690():
  with pytest.raises(ValueError) as excinfo:
    lat_lng(', 16.413690')

def test_10_48_205870_16_413690():
  with pytest.raises(ValueError) as excinfo:
    lat_lng('48,205870, 16,413690')