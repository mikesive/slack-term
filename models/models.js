var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shhlack');

var Remote = mongoose.model('Remote',
  {
    name: String,
    slackKey: String,
    host: String
  }
);
