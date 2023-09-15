const mongoose = require('mongoose');

// Define the Village Schema
const villageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, 
    },
  ],
  priority: {
    type: Number,
    default: 1, 
  },
  needs: [
    {
      type: String,
    },
  ],
  contactInfo: {
    type: String,
  },
});

// Create the Village model
const Village = mongoose.model('Village', villageSchema);

module.exports = Village;
