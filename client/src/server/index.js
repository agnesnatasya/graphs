const express = require('express')
const bodyParser = require('body-parser');
const { spawn, exec } = require('child_process');
const app = express()
const port = 3000
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  code_value = (req.body.code);
  console.log(code_value);
  var n_list = [1, 2, 4, 8, 16, 32, 64, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000];

  /*
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['script1.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      res.send(dataToSend)
  });
  */
  const python_first = spawn('python3', ['function_writer.py', code_value, n_list]);
  python_first.stdout.on('data', function (data) {
    console.log('Lol this is the first result ...');
    console.log(data.toString());
  });
  function execP(cmd, item) {
    return new Promise(function (resolve, reject) {
      const { exec } = require('child_process');
      exec(cmd, function (err, stdout, stderr) {
        if (err) {
          reject(err);
        } else {
          var dataToSend;
          const python = spawn('python3', ['cover_scrape.py', item]);
          // collect data from script

          python.stdout.on('data', function (data) {
            //console.log('Pipe data from python script ...');
            dataToSend = data.toString();
            //console.log(dataToSend);
            resolve({ dataToSend, stderr });
            //result[i] = dataToSend;
          });
          // in close event we are sure that stream from child process is closed
          python.on('close', (code) => {
            //console.log('child process close all stdio with code ${code}');
            // send data to browser
            //console.log(dataToSend);
            //return dataToSend
          });

        }
      });
    });
  }

  var result = []
  Promise.all(n_list.map(function (item) {
    return execP('python3  -m trace --count -C ./function ./function/function' + item + '.py ' + item, item).then(function (data) {
      var send = { x: item, y: parseInt(data.dataToSend) };
      return [item, data.dataToSend];
    });
  })).then(function (results) {
    //var output = results.join("");
    //result.push(results);
    console.log(results);
    const python = spawn('python3', ['regression.py', results]);
    python.stderr.on('data', function (data) {
      //console.log(data.toString())
    });
    python.stdout.on('data', function (data) {
      //console.log('Pipe data from python script ...');
      console.log(data.toString());
      result = data.toString();
      //result[i] = dataToSend;
    });
    python.on('close', (code) => {
      //console.log('child process close all stdio with code ${code}');
      // send data to browser
      //console.log(dataToSend);
      //return dataToSend
      res.send(result)
    });
    // process output here
  }, function (err) {
    // process error here
  });


  /*var result = {};
  console.log(i);
  var i = [1, 1001, 2001, 3001, 40001, 5000, 6000];
  Promise.all(i.map(function (item) {
    const { exec } = require('child_process');
    exec(`python3  -m trace --count -C . script1.py ${item}`, (err, stdout, stderr) => {
      var dataToSend;
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        // the *entire* stdout and stderr (buffered)
        // spawn new child process to call the python script
        const python = spawn('python', ['script3.py']);
        // collect data from script
        python.stdout.on('data', function (data) {
          //console.log('Pipe data from python script ...');
          dataToSend = data.toString();
          //console.log(i)
          //result[i] = dataToSend;
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
          //console.log('child process close all stdio with code ${code}');
          // send data to browser
          //console.log(dataToSend);
          //return dataToSend
        });
      }
      resolve(stdout ? dataToSend : stderr);
    });
  })).then(function (results) {
    console.log(results)
    var output = results.join("");
    console.log(output);
    // process output here
  }, function (err) {
    // process error here
  });
  */
  /*
  const { exec } = require('child_process');
  exec(`python3  -m trace --count -C . script1.py ${i}`, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err);
    } else {
      // the *entire* stdout and stderr (buffered)
      // spawn new child process to call the python script
      const python = spawn('python', ['script3.py']);
      var dataToSend;
      // collect data from script
      python.stdout.on('data', function (data) {
        //console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(i)
        result[i] = dataToSend;
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
        //console.log('child process close all stdio with code ${code}');
        // send data to browser
        console.log(result);
      });
    }
  });
  i += 1000;

  */

  //res.send(result);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

