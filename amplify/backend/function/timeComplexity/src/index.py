import function_writer
import regression
import cover_scrape
import os
import json


def handler(event, context):
    x_list = [1, 2, 4, 8, 16, 32, 64, 128, 256]
    print(event)
    print(event.get('body', {}))
    if not event.get('body'):
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers':
                'Content-Type',
            'Access-Control-Allow-Origin':
                '*',
            'Access-Control-Allow-Methods':
                'OPTIONS,POST,GET'
        },
        'body': json.dumps([])
        }
    body = json.loads(event.get('body', '{}') or '{}')
    code = body.get('code')
    y_list = []
    for n in x_list:
        function_writer.write_function(code, str(n))
        os.system(
            f'python3 -m trace --count -C /tmp /tmp/f{n}.py {n}'
        )
        result = cover_scrape.scrape_cover(str(n))
        y_list.append(result)
    equation = regression.approximate_time_complexity(x_list, y_list)
    coord = [{"x": coord[0], "y": coord[1]} for coord in zip(x_list, y_list)]
    print({"equation": equation, "coord": coord})
    body = json.dumps({"equation": equation, "coord": coord})
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers':
                'Content-Type',
            'Access-Control-Allow-Origin':
                '*',
            'Access-Control-Allow-Methods':
                'OPTIONS,POST,GET'
        },
        'body': body
    }
