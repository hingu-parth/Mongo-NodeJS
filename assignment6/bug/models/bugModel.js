const mongoose = require('mongoose');

const BugSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignee: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bug', BugSchema);
