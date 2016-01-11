var express = require('express');
var https = require('https');
var http = require('http');
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
    slackToken: requestData.token
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

var port = process.env.PORT || 3000;
var httpsPort = process.env.HTTPSPORT || 443;
console.log('Listening on '+ port + '...');
http.createServer(app).listen(port);

var credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/sshlack.sive.com.au/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/sshlack.sive.com.au/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/sshlack.sive.com.au/chain.pem')
};
https.createServer(credentials, app).listen(httpsPort);
