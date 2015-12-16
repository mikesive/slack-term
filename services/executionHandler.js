// Connect to Mongo
var mongoose = require('mongoose');
var dbURI = process.env.MONGOLAB_URI || "mongodb://localhost/sshlack";
mongoose.connect(dbURI);

// Models
var Remote = require('../models/remote')(mongoose);
var User = require('../models/user')(mongoose);

module.exports = function ExecutionHandler(requestType, args){
  this.requestType = requestType;
  this.args = args;

  var self = this;

  function execute(){
    var result;
    var params = self.args;
    if (self.requestType == "Create"){
      self.modelType = params.shift();
      result = createRecord(modelType, params);
    }
    else if (self.requestType == "Delete"){
      self.modelType = params.shift();
      result = deleteRecord(modelType, params);
    }
    else {
      result = "Error: not a valid requestType";
    }
  }

  function createRecord(model, args){
    if (model == "user"){
      //TODO
    }
    else if (model == "remote"){
      //TODO
    }
    else {
      var result = "Error: not a valid model type";
    }
  }

  function deleteRecord(model, args){
    if (model == "user"){
      //TODO
    }
    else if (model == "remote"){
      //TODO
    }
    else {
      var result = "Error: not a valid model type";
    }
  }
};
