from visualizer import app
from .utils import function_writer, regression, cover_scrape
from .functions import f1
import trace
import sys
import os

n_list = [1, 2, 4, 8, 16, 32, 64, 128, 256]

@app.route('/')
def hello_world():
    code = 'def f(x):\n\tpass'
    y_list = []
    for n in n_list:
        function_writer.write_function(code, str(n))
        os.system(f'python3 -m trace --count -C ./visualizer/functions ./visualizer/functions/f{n}.py {n}')
        result = cover_scrape.scrape_cover(str(n))
        y_list.append(result)
    result = regression.approximate_time_complexity(n_list, y_list)
    print(result)
    return function_writer.read_function()
