const express = require('express')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express()
const port = 3000
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  code_value = (req.body.code);
  console.log(code_value);
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
  const { exec } = require('child_process');
  const python_first = spawn('python', ['script0.py', code_value]);
  /*python_first.stdout.on('data3', function (data3) {
    console.log('Lol this is the first result ...');
    console.log(data3.toString());
  });*/

  exec('python3  -m trace --count -C . script1.py', (err, stdout, stderr) => {
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
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
        console.log('child process close all stdio with code ${code}');
        // send data to browser
        console.log(dataToSend);
        res.send(dataToSend);
      });
    }
  });
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

