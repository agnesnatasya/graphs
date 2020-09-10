import sys

def write_function(code, item):
    driver = "\nimport sys\nif __name__ == '__main__':\n\tinput_int = sys.argv[1]\n\tf(int(input_int))"
    with open("./visualizer/functions/f" + item + ".py", "w") as outfile:
        outfile.write(code)
        outfile.write(driver)

def read_function():
    return 'HEllo'