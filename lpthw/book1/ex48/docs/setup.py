try:
    from setuptools import setup
except ImportError:
      from distutils.core import setuptools

config = {
    'description': 'My Project',
    'author': 'Jonathan',
    'url': 'URL to get it at.',
    'download_url': 'Where to download it.',
    'author_email': 'My email.',
    'version': '0.1',
    'install_requires': ['nose'],
    'packages': ['ex48'],
    'scripts': [],
    'name': 'projectname'
}

setup(**config)
