var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// Adds a new remote server
app.post('/remote', function (req, res) {
  // var remoteName = req.query.text;
  // var remoteHost = req.query.remoteHost;
  res.send('POST request data: ' + req.body.text + "\n");
});

console.log('listening...');
var port = process.env.PORT || 3000;
app.listen(port);
