from setuptools import find_packages, setup

with open('README.md', 'r') as file:
  long_description = file.read()

setup(author='Simon Repp',
      author_email='simon@fdpl.io',
      classifiers=(
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent"
      ),
      description='A cross-language type library',
      long_description=long_description,
      long_description_content_type="text/markdown",
      license='MIT',
      name='enotype',
      packages=find_packages(exclude=['tests', 'tests.*']),
      url='https://eno-lang.org/enotype/',
      version='0.2.0',
      zip_safe=False)
