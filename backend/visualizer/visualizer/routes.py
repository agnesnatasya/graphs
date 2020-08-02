from flask import jsonify, request
from visualizer import app
from .utils import function_writer, regression, cover_scrape
from .functions import f1
import trace
import sys
import os

x_list = [1, 2, 4, 8, 16, 32, 64, 128, 256]

@app.route('/submit', methods=['POST'])
def hello_world():
    print("AAAA")
    code = request.get_json().get('code')
    y_list = []
    for n in x_list:
        function_writer.write_function(code, str(n))
        os.system(f'python3 -m trace --count -C ./visualizer/functions ./visualizer/functions/f{n}.py {n}')
        result = cover_scrape.scrape_cover(str(n))
        y_list.append(result)
    equation = regression.approximate_time_complexity(x_list, y_list)
    coord = [{"x": coord[0], "y": coord[1]} for coord in zip(x_list, y_list)]
    return jsonify({"equation": equation, "coord": coord})
