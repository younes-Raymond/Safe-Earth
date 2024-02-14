const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true // Ensure email addresses are unique
    },
    password: {
        type: String,
        required: true
    },
    receiveUpdates: {
        type: Boolean,
        default: false // Default value for receiving updates
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
