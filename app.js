var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
// Adds a new remote server
app.post('/remote', function (req, res) {
  // var remoteName = req.query.text;
  // var remoteHost = req.query.remoteHost;
  console.log('Request received...\ndata: ' + JSON.stringify(req.body));
  res.send('POST request data: ' + req.body.text + "\n");
});

console.log('listening...');
app.listen(9000);
