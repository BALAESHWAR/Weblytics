const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  url: String,
  domain: String,
  title: String,
  duration: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Session", sessionSchema);
