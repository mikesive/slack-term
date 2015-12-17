module.exports = function(dbProvider){
  var userSchema = dbProvider.Schema(
    {
      userName: String,
      userId: String,
      teamId: String
    }
  );
  var User = dbProvider.model('User', userSchema);

  return {
    create: function(params, finish){
      var q = User.where(params);
      q.findOne(function(err, user){
        if (user){
          finish({errors: ["Error: User already exists - " + params.userName]});
        }
        else {
          var newUser = new User(params);
          newUser.save(function(error){
            if (error){
              finish({errors: ["Error: " + error]});
            }
            else {
              finish({message: "User created: " + params.userName});
            }
          });
        }
      });
    },
    delete: function(params, finish){
      var q = User.where(params);
      q.findOne(function(err, user){
        if (user){
          User.remove(params, function(error){
            finish({message: "Deleted user - " + params.userName});
          });
        }
        else {
          finish({errors: ["Error: user " + params.userName + " doesn't exist."]});
        }
      });
    }
  };
};
