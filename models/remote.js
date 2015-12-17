module.exports = function(dbProvider){
  var remoteSchema = dbProvider.Schema(
    {
      host: String,
      user: String
    }
  );
  return dbProvider.model('Remote', remoteSchema);
};
