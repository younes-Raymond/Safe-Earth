
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the qSettings schema
const SettingsSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  associationNumber: {
    type: String,
    required: true
  },
  mapStyle: {
    type: String,
    enum: ['Streets', 'Satellite', 'Outdoors'],
    default: 'Streets'
  },
  selectedLanguage: {
    type: String,
    enum: ['English', 'French', 'Arabic'],
    default: 'English'
  },
  // Add more settings fields as needed
  userToken: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the Settings model
const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;
