var ExecutionHandler = require('./executionHandler');
module.exports = function SubRouter(request, finish){
  this.request = request;
  this.result = {};
  this.errors = [];
  this.args = [];
  this.requestType = null;
  var self = this;
  execute();

  // Execute request
  function execute(){
    checkRequestType();
    checkErrors(self.requestType, self.args);
    if (self.errors.length > 0){
      self.result.errors = self.errors;
      finish(self.result);
    }
    else {
      var execHandler = new ExecutionHandler(self.requestType, self.args, finish);
      execHandler.execute();
    }
  }

  // Check if request begins with argument
  function requestBeginsWith(str){
    return self.request.substring(0, str.length) === str;
  }

  // Determine the request type
  function checkRequestType(){
    if (requestBeginsWith("\n")){
      self.requestType = "SSH";
    }
    else if (requestBeginsWith("create")){
      self.requestType = "Create";
      self.args = self.request.split(" ");
      self.args.shift();
    }
    else if (requestBeginsWith("delete")){
      self.requestType = "Delete";
      self.args = self.request.split(" ");
      self.args.shift();
    }
    else {
      self.requestType = "Invalid";
    }
  }

  // Appends errors to error array if request is invalid
  function checkErrors(requestType, args){
    var invalid = false;
    if (requestType === "Invalid"){
      invalid = true;
    }
    else if (requestType === "Create" || requestType === "Delete"){
      invalid = invalidCreateOrDelete(args);
    }
    if (invalid){
      self.errors.push("Invalid command...");
      self.errors.push("Valid commands:");
      self.errors.push("<Create/Delete> remote <name> <username> <host>");
      self.errors.push("<Create/Delete> user");
      self.errors.push("<remote name>\ncommand 1\ncommand 2\n...");
    }
  }

  // Checks for validity of create or delete arguments
  function invalidCreateOrDelete(args){
    var invalid = false;
    if (args.length < 1){
      invalid = true;
    }
    else if (args[0] === "user"){
      invalid = invalidUserArgs(args);
    }
    else if (args[0] === "remote"){
      invalid = invalidRemoteArgs(args);
    }
    return invalid;
  }

  // Checks for invalid user arguments
  function invalidUserArgs(args){
    if (args.length !== 1){
      return true;
    }
    return false;
  }

  // Checks for invalid remote arguments
  function invalidRemoteArgs(args){
    if (args.length !== 4){
      return true;
    }
    return false;
  }
};
