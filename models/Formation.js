const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  trainer: String,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String
});

module.exports = mongoose.model('Formation', formationSchema);
