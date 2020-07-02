const express = require('express')
const { spawn } = require('child_process');
const app = express()
const port = 3000
app.get('/submit', (req, res) => {

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
  var dataToSend;
  exec('python3  -m trace --count -C . script1.py', (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      // spawn new child process to call the python script
      const python = spawn('python', ['script3.py']);
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
    }
  });
  return dataToSend


})
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))

