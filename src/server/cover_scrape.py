import sys
f = open("./function/function" + sys.argv[1] + ".cover", "r")
total = 0
for line in f:
    splitted = line.split(':')
    if splitted:
        try:
            total += int(splitted[0].strip())
        except:
            pass
print(total, end='')