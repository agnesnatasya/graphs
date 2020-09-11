import function_writer
import cover_scrape
import regression
import os


def handler(event, context):
    x_list = [1, 2, 4, 8, 16, 32, 64, 128, 256]
    code = (event.get('body') or {}).get('code', '')
    y_list = []
    for n in x_list:
        function_writer.write_function(code, str(n))
        os.system(
            f'python3 -m trace --count -C functions/ functions/f{n}.py {n}'
        )
        result = cover_scrape.scrape_cover(str(n))
        y_list.append(result)
    equation = regression.approximate_time_complexity(x_list, y_list)
    coord = [{"x": coord[0], "y": coord[1]} for coord in zip(x_list, y_list)]
    return {"equation": equation, "coord": coord}
