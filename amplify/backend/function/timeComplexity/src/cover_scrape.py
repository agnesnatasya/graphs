import sys

def scrape_cover(item):
    f = open("/tmp/f" + item + ".cover", "r")
    total = 0
    for line in f:
        splitted = line.split(':')
        if splitted:
            try:
                total += int(splitted[0].strip())
            except:
                pass
    return total
