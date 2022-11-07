from sys import argv

script, first = argv

txt = open(first)
print(txt.read())