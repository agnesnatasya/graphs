import sys
driver = "\nimport sys\nif __name__ == '__main__':\n\tinput_int = sys.argv[1]\n\tf(int(input_int))"
#print(sys.argv[2])
print("AA")
n_list = list(sys.argv[2].split(","))
for n in n_list:
    with open("./function/function" + n + ".py", "w") as outfile:
        outfile.write(sys.argv[1])
        outfile.write(driver)
