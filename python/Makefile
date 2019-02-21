build:
		python3 setup.py sdist bdist_wheel

clean:
		rm -rf build/ dist/ enotype.egg-info

publish:
		twine upload ./dist/*

test-publish:
		twine upload -r testpypi ./dist/*
