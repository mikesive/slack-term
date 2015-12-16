module.exports = function CommandSet(commands){

  this.commands = commands;
  this.errors = [];
  checkErrors();

  this.getErrors = function(){
    return this.errors;
  };

  function checkErrors(){
    if (!testNewLine()){
      this.errors.push("Please start your commands with a newline character (Shift + Enter in Slack).");
    }
  }

  function testNewLine(){
    var newline = "\n";
    return this.commands.substring(0, newline.length) === newline;
  }
};
