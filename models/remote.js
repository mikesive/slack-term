module.exports = function(dbProvider){
  var remoteSchema = dbProvider.Schema(
    {
      host: String,
      user: String
    }
  );
  dbProvider.model('Remote', remoteSchema);
};
