module.exports = function CommandSet(commands){
  this.commands = commands;
  this.errors = [];
  var self = this;
  checkErrors();

  this.getErrors = function(){
    return self.errors;
  };

  function checkErrors(){
    if (!testNewLine()){
      self.errors.push("Please start your commands with a newline character (Shift + Enter in Slack).");
    }
  }

  function testNewLine(){
    var newline = "\n";
    return self.commands.substring(0, newline.length) === newline;
  }
};
