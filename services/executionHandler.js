// Connect to Mongo
var mongoose = require('mongoose');
var dbURI = process.env.MONGOLAB_URI || "mongodb://localhost/sshlack";
mongoose.connect(dbURI);

// Models
var Remote = require('../models/remote')(mongoose);
var User = require('../models/user')(mongoose);

module.exports = function ExecutionHandler(credentials, requestType, args, finish){
  this.requestType = requestType;
  this.args = args;
  this.result = {};
  this.credentials = credentials;

  var self = this;

  this.execute = function(){
    var result;
    var params = self.args;
    if (self.requestType == "Create"){
      self.modelType = params.shift();
      createRecord(self.modelType, params, finish);
    }
    else if (self.requestType == "Delete"){
      self.modelType = params.shift();
      deleteRecord(self.modelType, params, finish);
    }
    else {
      self.result.errors = ["Error: not a valid requestType"];
      finish(self.result);
    }
  };

  function createRecord(model, args, finish){
    if (model == "user"){
      var user = new User(
        {
          userName: self.credentials.userId,
          userId: self.credentials.userToken,
          teamId: self.credentials.teamToken
        }
      );
      user.save(function(error){
        if (error){
          self.result.errors = ["Error: " + error];
        }
        else {
          self.result.message = "Successfully created user " + self.credentials.userName;
        }
        finish(self.result);
      });
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
