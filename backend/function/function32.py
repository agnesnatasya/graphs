def f(x):
  for i in range(6):
    print(x)
import sys
if __name__ == '__main__':
	input_int = sys.argv[1]
	f(int(input_int))