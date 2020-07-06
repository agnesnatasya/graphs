def f(x):
    for i in range(x):
        print("A")
import sys
if __name__ == '__main__':
	input_int = sys.argv[1]
	f(int(input_int))