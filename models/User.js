const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  responsibleName: String,
  email: String,
  school: String,
  series: String,
});

module.exports = User;
