const express = require('express')
const { spawn } = require('child_process');
var bodyParser = require('body-parser');

const router = express.Router();
const app = express();
const port = 3000;
const host = '0.0.0.0';
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    code_value = req.body.code;
    console.log(code_value);
    var n_list = [1, 2, 4, 8, 16, 32, 64, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  //var n_list = [1, 2, 4, 8, 16, 32, 64, 100];
    //const python_first = spawn('python3', ['function_writer.py', code_value, n_list]);
    /*python_first.stdout.on('data', function (data) {
    console.log('Lol this is the first result ...');
    console.log(data.toString());
    });*/
  const python_first = spawn('python3', ['function_writer.py', code_value, n_list]);

  function execWrite(item) {
      console.log(item)
      return new Promise(function (resolve, reject) {
        const { exec } = require('child_process');
        console.log()
        const python = spawn('python3', ['function_writer.py', code_value, item]);
        

        python.stdout.on('data', function (data) {
          console.log(data.toString())
          resolve();
        });
      })
    }


  function execCover(cmd, item, execP) {
    return new Promise(function (resolve, reject) {
      const { exec } = require('child_process');
      console.log()
      exec(cmd, function (err, stdout, stderr) {
        if (err) { }
        execP(item).then(function (data) {
          resolve([item, data])
        });
        
      });
    })

  }

    function execP(item) {
      return new Promise(function (resolve, reject) {
        console.log("A")
        var dataToSend;
        const python = spawn('python3', ['cover_scrape.py', item]);
        python.stderr.on('data', function (data) {
            console.log(data.toString())
        });

        python.stdout.on('data', function (data) {
            dataToSend = data.toString();
            resolve(dataToSend);
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        });
      });
    }

    var result = {}
    Promise.all(n_list.map(function (item) {
      console.log(item);
        return execCover('python3 -m trace --count -C ./function ./function/function' + item + '.py ' + item, item, execP).then(function (data) {
          return data;
      })
    })).then(function (coords) {
        console.log(coords)
        coords_in_obj = coords.map(function (result) {
            return { x: result[0], y: parseInt(result[1]) }
        });
        result['coord'] = coords_in_obj;
        const python = spawn('python3', ['regression.py', coords]);

        python.stderr.on('data', function (data) {
            console.log(data.toString())
        });
        python.stdout.on('data', function (data) {
            console.log(data.toString());
            result['equation'] = data.toString();
        });
        python.on('close', (code) => {
            res.json(result)
        });
        // process output here
    }, function (err) {
        // process error here
    });
});

app.listen(port, () => console.log(`Example app listening on port 
${port}!`))
