var ssh = require('simple-ssh');
var http = require('http');
var url = require("url");
module.exports = function(){
  return {
    execute: function(host, user, commands, returnUrl){
      var ssh = new SSH({
        host: remote.host,
        user: remote.user
      });

      comands.forEach(function(command){
        ssh.exec(command, {
          out: function(output){
            postBackToUrl(output);
          },
          exit: function(code) {
            if (code === 1) {
              return false;
            }
          }
        });
      });

      ssh.start();
    }
  };

  function postBackToUrl(result){
    var urlObj = url.parse(returnUrl);
    var host = urlObj.host;
    var path = urlObj.protocol + "//" + urlObj.pathname;
    var params = JSON.stringify({
      "response_type": "in_channel",
      "text": result
    });
    var options = {
      host: host,
      path: path,
      method: 'POST',
      headers: { 'content-type': 'application/json' }
    };

    var req = http.request(options, function(response){});
    req.write(params);
    req.end();
  }
};
