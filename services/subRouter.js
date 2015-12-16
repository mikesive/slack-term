module.exports = function SubRouter(request){
  this.request = request;
  this.errors = [];
  this.args = [];
  this.requestType = null;
  var self = this;

  checkRequestType();
  checkErrors();

  this.getErrors = function(){
    return self.errors;
  };

  function checkRequestType(){
    if (requestBeginsWith("\n")){
      self.requestType = "SSH";
    }
    else if (requestBeginsWith("Create")){
      self.requestType = "Create";
      self.args = self.request.split(" ");
      self.args.shift();
    }
    else if (requestBeginsWith("Delete")){
      self.requestType = "Delete";
      self.args = self.request.split(" ");
      self.args.shift();
    }
    else {
      self.requestType = "Invalid";
    }
  }

  function checkErrors(){
    var invalid = false;
    if (self.requestType === "Invalid"){
      invalid = true;
    }
    else if (self.requestType === "Create" || self.requestType === "Delete"){
      invalid = invalidCreateOrDelete(args);
    }
    if (invalid){
      self.errors.push("Invalid command...");
      self.errors.push("Valid commands:");
      self.errors.push("<Create/Delete> remote <name>");
      self.errors.push("<Create/Delete> user");
      self.errors.push("<remote name>\ncommand 1\ncommand 2\n...");
    }
  }

  function requestBeginsWith(str){
    return self.request.substring(0, str.length) === str;
  }

  function invalidCreateOrDelete(args){
    var invalid = false;
    if (args.length < 1){
      invalid = true;
    }
    else if (args[0] === "user"){
      if (args.length !== 1){
        invalid = true;
      }
    }
    else if (args[0] === "remote"){
      if (args.length !== 2){
        invalid = true;
      }
    }
    return invalid;
  }
};
