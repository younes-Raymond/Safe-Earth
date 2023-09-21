const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  damageLevel: {
    type: String,
    enum: ['High', 'Medium', 'Low'], 
    required: true
  },
  peopleAffected: {
    type: Number,
    required: true
  },
  imageUrls: {
    type: [String],
    required: true
  },
  videoUrls: {
    type: [String],
    required: true
  },
  liveStreamUrl: {
    type: String,
    required: true
  },
  userContributions: {
    type: [
      {
        name: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 50
        },
        destination: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 50
        },
        email: {
          type: String,
          required: true,
          minlength: 10,
          maxlength: 40
        },
        userIdLS: {
          type: String,
          required: true,
          maxlength: 50
        },
        role: {
          type: String,
          maxlength: 40
        },
        takenAt: {
          type: Date,
          required: true,
          default: Date.now
        },
        latitude: {
          type: Number,
          required: true
        },
        longitude: {
          type: Number,
          required: true
        }
      }
    ],
    default: []
  },
  needs: {
    type: [String], // Add any specific needs data type
    default: []
  }
});

villageSchema.index({ location: '2dsphere' }); // Create a geospatial index for location

const Village = mongoose.model('Village', villageSchema);

module.exports = Village;
