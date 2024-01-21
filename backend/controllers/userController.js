const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const cloudinary = require('cloudinary').v2; 
const sendToken = require('../utils/sendToken');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const Village = require('../models/VillageModel')


exports.search = asyncErrorHandler(async (req, res) => {
  const { keyword } = req.params;
  console.log('Keyword:', keyword);

  try {
    // Search in the Village collection
    const regex = new RegExp(keyword.replace(/[Ll]/g, ''), 'i');
    const villages = await Village.find({
      Name: { $regex: regex }
    }).exec();

    if (villages.length > 0) {
      console.log('Found villages:', villages);
      res.status(200).json({ success: true, villages });
    } else {
      console.log('No villages found.');
      res.status(200).json({ success: true, villages: [] });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});







