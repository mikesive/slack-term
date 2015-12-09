var express = require('express');

var app = express();

// Adds a new remote server
app.post('/remote', function (req, res) {
  // var remoteName = req.query.text;
  // var remoteHost = req.query.remoteHost;
  console.log('Request received...\ndata: ' + req.param('text'));
  res.send('POST request data: ' + req.param('text'));
});

console.log('listening...');
app.listen(9000);
