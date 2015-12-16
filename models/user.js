var userSchema = mongoose.Schema(
  {
    userName: String,
    userId: String,
    teamToken: String
  }
);

module.exports = function(mongoose){
  mongoose.model('User', userSchema);
};
