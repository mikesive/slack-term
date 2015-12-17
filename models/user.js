module.exports = function(dbProvider){
  var userSchema = dbProvider.Schema(
    {
      userName: String,
      userId: String,
      teamId: String
    }
  );
  return dbProvider.model('User', userSchema);
};
