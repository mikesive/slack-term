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
        if (err){
          var newUser = new User(params);
          newUser.save(function(error){
            if (error){
              finish({error: ["Error: " + error]});
            }
            else {
              finish({message: "User created: " + params.userName});
            }
          });
        }
        else {
          finish({error: ["Error: User already exists - " + params.userName]});
        }
      });
    }
  };
};
