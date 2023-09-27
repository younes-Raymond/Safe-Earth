const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
  X: {
    type: Number,
    required: true,
  },
  Y: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Village = mongoose.model('Village', villageSchema);

module.exports = Village;
