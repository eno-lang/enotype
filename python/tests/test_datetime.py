import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import datetime

def test_0_1990():
  assert datetime('1990') == python_datetime.strptime('1990-01-01T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_1_1991_01():
  assert datetime('1991-01') == python_datetime.strptime('1991-01-01T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_2_1992_02_02():
  assert datetime('1992-02-02') == python_datetime.strptime('1992-02-02T00:00:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_3_1993_03_03t19_20_01_00():
  assert datetime('1993-03-03T19:20+01:00') == python_datetime.strptime('1993-03-03T18:20:00.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_4_1994_04_04t19_20_30_01_00():
  assert datetime('1994-04-04T19:20:30+01:00') == python_datetime.strptime('1994-04-04T18:20:30.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_5_1995_05_05t19_20_30_45_01_00():
  assert datetime('1995-05-05T19:20:30.45+01:00') == python_datetime.strptime('1995-05-05T18:20:30.450+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_6_1996_06_06t08_15_30_05_00():
  assert datetime('1996-06-06T08:15:30-05:00') == python_datetime.strptime('1996-06-06T08:15:30.000-0500', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_7_1997_07_07t13_15_30z():
  assert datetime('1997-07-07T13:15:30Z') == python_datetime.strptime('1997-07-07T13:15:30.000+0000', '%Y-%m-%dT%H:%M:%S.%f%z')

def test_8_2002_12_14():
  with pytest.raises(ValueError) as excinfo:
    datetime('2002 12 14')

def test_9_2002_12_14_20_15():
  with pytest.raises(ValueError) as excinfo:
    datetime('2002-12-14 20:15')

def test_10_january():
  with pytest.raises(ValueError) as excinfo:
    datetime('January')

def test_11_13_00():
  with pytest.raises(ValueError) as excinfo:
    datetime('13:00')