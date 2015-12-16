module.exports = function CommandSet(commands){
  this.commands = commands;
  this.errors = [];
  var self = this;

  this.getErrors = function(){
    return self.errors;
  };
};
