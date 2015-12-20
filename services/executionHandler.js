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
    else if (self.requestType == "SSH"){
      var remoteName = params.shift();
      executeCommandSet(credentials.teamId, remoteName, params);
    }
    else {
      self.result.errors = ["Error: not a valid requestType"];
      finish(self.result);
    }
  };

  function executeCommandSet(teamId, remoteName, commands, finish){
    params = {
      name: remoteName,
      teamId: teamId
    };
    Remote.execute(params, commands, finish);
  }

  function createRecord(model, args, finish){
    if (model == "user"){
      params = {
        userName: self.credentials.userName,
        userId: self.credentials.userId,
        teamId: self.credentials.teamId
      };
      User.create(params, finish);
    }
    else if (model == "remote"){
      params = {
        name: args[0],
        user: args[1],
        host: args[2],
        teamId: self.credentials.teamId
      };
      Remote.create(params, finish);
    }
    else {
      self.result.errors = ["Error: not a valid modelType"];
      finish(self.result);
    }
  }

  function deleteRecord(model, args, finish){
    if (model == "user"){
      params = {
        userName: self.credentials.userName,
        userId: self.credentials.userId,
        teamId: self.credentials.teamId
      };
      User.delete(params, finish);
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
