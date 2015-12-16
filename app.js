var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// Adds a new remote server
app.post('/remote', function (req, res) {
  // var remoteName = req.query.text;
  // var remoteHost = req.query.remoteHost;
  console.log('Request received...\nreq: ' + req);
  console.log('Request received...\nparams: ' + JSON.stringify(req.params));
  console.log('Request received...\nquery: ' + JSON.stringify(req.query));
  console.log('Request received...\nbody: ' + JSON.stringify(req.body));
  res.send('POST request data: ' + JSON.stringify(req.body) + "\n");
});

console.log('listening...');
var port = process.env.PORT || 3000;
app.listen(port);
