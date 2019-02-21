import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import comma_separated

def test_0_one_two_three():
  assert comma_separated('one,two,three') == ['one', 'two', 'three']

def test_1_one_two_three():
  assert comma_separated(' one,two,three ') == ['one', 'two', 'three']

def test_2_one_two_three():
  assert comma_separated('one , two , three') == ['one', 'two', 'three']

def test_3_one_two_three():
  assert comma_separated(' one , two , three ') == ['one', 'two', 'three']

def test_4_():
  assert comma_separated(',,') == ['', '', '']

def test_5_one_two_three():
  assert comma_separated('one two three') == ['one two three']

def test_6_one_two_three():
  assert comma_separated('one;two;three') == ['one;two;three']

def test_7_():
  assert comma_separated('   ') == ['']