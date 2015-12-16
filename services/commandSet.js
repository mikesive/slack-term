module.exports = function CommandSet(commands){

  this.commands = commands;
  this.errors = [];
  this.checkErrors();

  this.checkErrors = function(){
    if (!this.testNewLine()){
      this.errors.push("Please start your commands with a newline character (Shift + Enter in Slack).");
    }
  };

  this.getErrors = function(){
    return this.errors;
  };

  this.testNewLine = function(){
    return this.commands.startsWith("\n");
  };
};
