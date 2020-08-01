from visualizer import app
from .utils import function_writer, regression, cover_scrape
from .functions import f1
import trace
import sys
import os
n_list = [1, 2, 4, 8, 16, 32, 64, 128, 256]


@app.route('/')
def hello_world():
    code = 'def f(x):\n\tfor i in range(x):\n\t\tfor i in range(x):\n\t\t\tfor i in range(x):\n\t\t\t\tpass'
    y_list = []
    for n in n_list:
        function_writer.write_function(code, str(n))
        os.system(f'python3 -m trace --count -C ./visualizer/functions ./visualizer/functions/f{n}.py {n}')
        result = cover_scrape.scrape_cover(str(n))
        y_list.append(result)
        #trace_function(n)
    result = regression.approximate_time_complexity(n_list, y_list)
    print(result)
    return function_writer.read_function()

def trace_function(item):
    tracer = trace.Trace(ignoredirs=[sys.prefix, sys.exec_prefix],
                         trace=0,
                         count=1)
    #f1.f(1)
    # run the new command using the given tracer
    f1.f(1)
    exec('f1.f(1)')
    tracer.run('f1.f(1)')

    # make a report, placing output in the current directory
    r = tracer.results()
    r.write_results(show_missing=True, coverdir="cover")
