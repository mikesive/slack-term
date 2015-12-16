var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// Adds a new remote server
app.post('/remote', function (req, res) {
  // var remoteName = req.query.text;
  // var remoteHost = req.query.remoteHost;
  console.log('Request received...\ndata: ' + JSON.stringify(req, null, 4));
  res.send('POST request data: ' + JSON.stringify(req, null, 4) + "\n");
});

console.log('listening...');
var port = process.env.PORT || 3000;
app.listen(port);
