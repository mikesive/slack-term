var express = require('express');
var bodyParser = require('body-parser');

// Services
var CommandSet = require('./services/commandSet');
var SubRouter = require('./services/subRouter');

// Set up server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Route for Slack post
app.post('/remote', function (req, res) {
  requestData = req.body;
  request = requestData.text;
  user_id = requestData.user_id;
  var subRouter = new SubRouter(request, function(result){
    if (result.errors){
      console.log("Finishing main.");
      res.send(result.errors.join("\n"));
    }
    else {
      console.log("Finishing main.");
      res.send('Success: ' + result.message + "\n");
    }
  });
});

var port = process.env.PORT || 3000;
console.log('Listening on '+ port + '...');
app.listen(port);
