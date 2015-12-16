module.exports = function(dbProvider){
  var userSchema = dbProvider.Schema(
    {
      userName: String,
      userId: String,
      teamToken: String
    }
  );
  dbProvider.model('User', userSchema);
};
