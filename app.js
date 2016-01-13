var express = require('express');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');

// Services
var SubRouter = require('./services/subRouter');

// Set up server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Default server test
app.get('/', function(req, res){
  res.send('Success! Server is up.');
});

// Route for Slack post
app.post('/remote', function (req, res) {
  requestData = req.body;
  request = requestData.text;
  var credentials = {
    userName: requestData.user_name,
    userId: requestData.user_id,
    teamId: requestData.team_id,
    slackToken: requestData.token,
    responseUrl: requestData.response_url
  };
  var subRouter = new SubRouter(request, credentials, function(result){
    if (result.errors){
      res.send(result.errors.join("\n"));
    }
    else {
      res.send('Success: ' + result.message + "\n");
    }
  });
});

var httpsPort = process.env.HTTPSPORT || 443;
var key_path = process.env.PRIVKEY;
var cert_path = process.env.CERT;
var ca_path = process.env.CAPATH;

if (key_path && cert_path && ca_path) {
  var credentials = {
    key: fs.readFileSync(key_path),
    cert: fs.readFileSync(cert_path),
    ca: fs.readFileSync(ca_path)
  };
  console.log('Found SSL settings. Listening on port ' + httpsPort + '...');
  https.createServer(credentials, app).listen(httpsPort);
}
