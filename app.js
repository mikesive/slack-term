var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_t1cnkm5k:2gdeul69rmneiftotfi0l1p9kq@ds033135.mongolab.com:33135/heroku_t1cnkm5k');

// Services
var CommandSet = require('./services/commandSet');
var SubRouter = require('./services/subRouter');

// Models
var Remote = require('./models/remote')(mongoose);
var User = require('./models/user')(mongoose);

// Set up server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Route for Slack post
app.post('/remote', function (req, res) {
  requestData = req.body;
  request = requestData.text;
  user_id = requestData.user_id;
  var subRouter = new SubRouter(request);
  var errors = SubRouter.getErrors();
  if (errors.length > 0){
    res.send(errors.join("\n"));
  }
  else {
    res.send('Valid command: ' + req.body.text + "\n");
  }
});

var port = process.env.PORT || 3000;
console.log('Listening on '+ port + '...');
app.listen(port);
