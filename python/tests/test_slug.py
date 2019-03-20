import pytest
from datetime import date as python_date, datetime as python_datetime
from enotype import slug

def test_0_eno_lang_article():
  assert slug('eno-lang-article') == 'eno-lang-article'

def test_1_eno_lang_article():
  assert slug('eno_lang_article') == 'eno_lang_article'

def test_2_eno_lang_article():
  with pytest.raises(ValueError) as excinfo:
    slug('eno-lang-article!')

def test_3_eno_lang_article():
  with pytest.raises(ValueError) as excinfo:
    slug('%eno-lang-article')

def test_4_eno_lang_article():
  with pytest.raises(ValueError) as excinfo:
    slug('eno lang article')

def test_5_enoe_laeng_aerticle():
  with pytest.raises(ValueError) as excinfo:
    slug('enö-läng-ärticle')

def test_6_eno_lang_article():
  with pytest.raises(ValueError) as excinfo:
    slug('énó-láng-ártíclé')