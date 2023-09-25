const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const cloudinary = require('cloudinary').v2; 
const sendToken = require('../utils/sendToken');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const csv = require('csv-parser');





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
