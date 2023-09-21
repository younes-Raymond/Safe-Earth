const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const cloudinary = require('cloudinary').v2; 
const sendToken = require('../utils/sendToken');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const csv = require('csv-parser');

exports.checkPosition = asyncErrorHandler(async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const targetLatitude = parseFloat(latitude);
    const targetLongitude = parseFloat(longitude);

    // Read and parse the CSV file
    const results = [];
    fs.createReadStream('../utils/Douars50km.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Extract latitude and longitude from CSV data
        const csvLatitude = parseFloat(data[1]);
        const csvLongitude = parseFloat(data[0]);

        // Compare latitude and longitude
        if (
          Math.abs(csvLatitude - targetLatitude) < 0.0001 &&
          Math.abs(csvLongitude - targetLongitude) < 0.0001
        ) {
          results.push(data);
        }
      })
      .on('end', () => {
        // If there are matching records, respond with "yes"
        if (results.length > 0) {
          return res.status(200).json({ message: 'yes' });
        }

        // If there are no matching records, respond with "not"
        return res.status(200).json({ message: 'not' });
      });
  } catch (error) {
    console.error('Error checking position:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});












exports.search = async (req, res) => {
  const { keyword } = req.query;
  try {
    // Search in Users collection
    const users = await Workers.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } }
      ]
    });

    // Search in Materials collection
    const materials = await Materials.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });

    // Search in Jobs collection
    const jobs = await Jobs.find({
      $or: [
        { jobTitle: { $regex: keyword, $options: 'i' } },
        { jobDescription: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.status(200).json({ success: true, users, materials, jobs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
