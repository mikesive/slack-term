module.exports = function(dbProvider){
  var remoteSchema = dbProvider.Schema(
    {
      name: String,
      host: String,
      user: String,
      teamId: String
    }
  );
  var Remote = dbProvider.model('Remote', remoteSchema);

  return {
    create: function(params, finish){
      var q = Remote.where(params);
      q.findOne(function(err, remote){
        if (remote){
          finish({errors: ["Error: Remote already exists - " + params.remoteName]});
        }
        else {
          var newRemote = new Remote(params);
          newRemote.save(function(error){
            if (error){
              finish({errors: ["Error: " + error]});
            }
            else {
              finish({message: "Remote created: " + params.host});
            }
          });
        }
      });
    },
    delete: function(params, finish){
      var q = Remote.where(params);
      q.findOne(function(err, remote){
        if (remote){
          Remote.remove(params, function(error){
            finish({message: "Deleted remote - " + params.name});
          });
        }
        else {
          finish({errors: ["Error: remote " + params.name + " doesn't exist."]});
        }
      });
    },
    execute: function(sshProvider, params, commands, finish){
      var q = Remote.where(params);
      result = { errors: [] };
      q.findOne(function(err, remote){
        if (remote){
          sshProvider.execute();
        }
        else {
          finish({errors: ["Error: remote " + params.name + " doesn't exist."]});
        }
      });
    }
  };
};
