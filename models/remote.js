var remoteSchema = mongoose.Schema(
  {
    host: String,
    user: String
  }
);

module.exports = function(mongoose){
  mongoose.model('Remote', remoteSchema);
};
