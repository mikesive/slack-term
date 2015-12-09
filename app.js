var express = require('express');

var app = express();

// Adds a new remote server
app.post('/remote', function (req, res) {
  var remoteName = req.query.remoteName;
  var remoteHost = req.query.remoteHost;
  res.send('POST request to the homepage\n');
});

console.log('listening...');
app.listen(9000);
