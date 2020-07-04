def func():
    f = open("script1.cover", "r")
    total = 0
    for line in f:
        splitted = line.split(':')
        if splitted:
            try:
                total += int(splitted[0].strip())
            except:
                pass
    print(total)


if __name__ == '__main__':
    func()