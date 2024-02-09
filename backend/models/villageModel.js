// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const VillageSchema = new mongoose.Schema({
  position: {
    type: [Number], // Array of numbers [latitude, longitude]
    required: true
  },
  options: {
    type: {
      title: {
        type: String,
        required: true
      },
      images: {
        type: {
          publicId: {
            type: String,
            required: true
          },
          url: {
            type: String,
            required: true
          }
        },
        required: true
      }
    },
    required: true
  }
});

// Create and export the model
const Village = mongoose.model('Village', VillageSchema);
module.exports = Village;
