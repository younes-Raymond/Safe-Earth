const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Village = require('../models/villageModel');
const Papa = require('papaparse');

exports.uploadAndSaveCsvFiles = asyncErrorHandler(async (req, res) => {
  // Assuming the CSV file is sent in the request body or as a file upload
  const csvData = req.body.csvData; // Adjust this based on your application's requirements

  // Parse the CSV data
  Papa.parse(csvData, {
    complete: async (result) => {
      try {
        const parsedData = result.data
          .filter((row) => !isNaN(parseFloat(row[1])) && !isNaN(parseFloat(row[0])))
          .map((row) => ({
            latitude: parseFloat(row[1]),
            longitude: parseFloat(row[0]),
            name: row[2],
          }));

        // Save the parsed data to the database
        const savedData = await Village.insertMany(parsedData);

        res.status(200).json({ success: true, data: savedData });
      } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ success: false, error: 'Error saving data' });
      }
    },
  });
});
