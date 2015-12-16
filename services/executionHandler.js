// Connect to Mongo
var mongoose = require('mongoose');
var dbURI = process.env.MONGOLAB_URI || "mongodb://localhost/sshlack";
mongoose.connect(dbURI);

// Models
var Remote = require('../models/remote')(mongoose);
var User = require('../models/user')(mongoose);

module.exports = function ExecutionHandler(requestType, args, finish){
  this.requestType = requestType;
  this.args = args;
  this.result = {};

  var self = this;
  execute();

  function execute(){
    var result;
    var params = self.args;
    if (self.requestType == "Create"){
      self.modelType = params.shift();
      createRecord(modelType, params, finish);
    }
    else if (self.requestType == "Delete"){
      self.modelType = params.shift();
      deleteRecord(modelType, params, finish);
    }
    else {
      self.result.errors = ["Error: not a valid requestType"];
      finish(self.result);
    }
  }

  function createRecord(model, args, finish){
    if (model == "user"){
      //TODO
      self.result.message = "Created User... //TODO";
      finish(self.result);
    }
    else if (model == "remote"){
      //TODO
      self.result.message = "Created Remote... //TODO";
      finish(self.result);
    }
    else {
      self.result.errors = ["Error: not a valid modelType"];
      finish(self.result);
    }
  }

  function deleteRecord(model, args, finish){
    if (model == "user"){
      //TODO
      self.result.message = "Deleted User... //TODO";
      finish(self.result);
    }
    else if (model == "remote"){
      //TODO
      self.result.message = "Deleted Remote... //TODO";
      finish(self.result);
    }
    else {
      self.result.errors = ["Error: not a valid modelType"];
      finish(self.result);
    }
  }
};
