const mongoose = require('mongoose');
const passwordLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  phone: Number,
  telephone: Number,
});

userSchema.plugin(passwordLocalMongoose);

module.exports = mongoose.model('User', userSchema);
