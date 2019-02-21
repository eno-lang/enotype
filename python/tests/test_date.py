import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import date

def test_0_1992_02_02():
  assert date('1992-02-02') == python_date(1992, 2, 2)

def test_1_1990():
  with pytest.raises(ValueError) as excinfo:
    date('1990')

def test_2_1991_01():
  with pytest.raises(ValueError) as excinfo:
    date('1991-01')

def test_3_1993_03_03t1920_01_00():
  with pytest.raises(ValueError) as excinfo:
    date('1993-03-03T1920+01:00')

def test_4_1994_04_04t1920_30_01_00():
  with pytest.raises(ValueError) as excinfo:
    date('1994-04-04T1920:30+01:00')

def test_5_1995_05_05t1920_30_45_01_00():
  with pytest.raises(ValueError) as excinfo:
    date('1995-05-05T1920:30.45+01:00')

def test_6_1996_06_06t0815_30_05_00():
  with pytest.raises(ValueError) as excinfo:
    date('1996-06-06T0815:30-05:00')

def test_7_1997_07_07t1315_30z():
  with pytest.raises(ValueError) as excinfo:
    date('1997-07-07T1315:30Z')

def test_8_2002_12_14():
  with pytest.raises(ValueError) as excinfo:
    date('2002 12 14')

def test_9_2002_12_14_20_15():
  with pytest.raises(ValueError) as excinfo:
    date('2002-12-14 20:15')

def test_10_january():
  with pytest.raises(ValueError) as excinfo:
    date('January')

def test_11_13_00():
  with pytest.raises(ValueError) as excinfo:
    date('13:00')