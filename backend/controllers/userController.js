const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Village = require('../models/villageModel');
const Papa = require('papaparse');
const csvParser = require('csv-parser');
const fs = require('fs');
const { file } = require('jszip');
const { Parser } = require('json2csv'); // Import json2csv library



exports.getAllVilagesData = asyncErrorHandler(async (req, res) => {
    try {
        const villages = await Village.find(); // Fetch all documents from the Village collection
        res.status(200).json(villages); // Return the villages as JSON response
    } catch (error) {
        console.error('Error fetching villages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




exports.uploadAndSaveCsvFiles = asyncErrorHandler(async (req, res) => {
    console.log('request => ', req.body)
    try {
        // Assuming req.body is an array of objects representing villages
        const villagesData = req.body;
        const savedVillages = [];
   let csvData = 'Latitude,Longitude,Name,Details,Donate\n';

     // Check if the Village collection exists
     const villageCollectionExists = await Village.exists();
     console.log(`Village collection exists: ${villageCollectionExists}`);

     // If the Village collection exists, remove it
     if (villageCollectionExists) {

         console.log('Removing documents from the Village collection...');

         await Village.deleteMany(); // Remove all documents in the collection

         console.log('Documents removed from the Village collection.');
     } else {
         
        console.log('Village collection does not exist.');
     }


        // Loop through each village data and save it to the database
        for (let villageData of villagesData) {
            // Extract necessary fields from villageData
            let { lat, lon, name, details } = villageData;
               console.log('position:', lat,lon)
            // Check if latitude contains brackets and trim any whitespace
            if (lat?.includes('[') || lat?.includes(']')) {
            lat = lat.replace('[', '').replace(']', '').trim(); 
            }
            // Check if longitude contains brackets and trim any whitespace
            if (lon?.includes('[') || lon?.includes(']')) {
            lon = lon.replace('[', '').replace(']', '').trim();
            }
            // Check if name contains HTML tags or ']' character and remove them if they exist 
            if (name) {
                if (/<([^>]+)>/.test(name)) {
                    name = name.replace(/(<([^>]+)>)/gi, '');
                }
                if (name.includes(']')) {
                name = name.replace(']', '');
                }
                // Trim extra whitespaces and keep only the first two word
                const words = name.trim().split(/\s+/);
                name = words.slice(0, 2).join(' ');
            }

            // Convert lat and lon to numbers
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);
            console.log('after parse it:' , latitude,longitude)
            let donate = 0
            // Check if latitude and longitude are valid numbers
            if (!isNaN(latitude) && !isNaN(longitude)) {

             


                // Create a new Village object
                const newVillage = new Village({
                    position: {
                        lat: latitude,
                        lon: longitude
                    },
                    name: name,
                    details: details,
                    donate: donate
                });



            // Save the village to the database
            const savedVillage = await newVillage.save();
            savedVillages.push(savedVillage);
            csvData += `"${latitude},${longitude}","${name}","${details}","${donate}"\n`;
            // Log the saved village data
            // console.log('Saved village:', savedVillage);
                
            } else {
                console.error(`Invalid latitude or longitude for village: ${name}`);
            }
        }
        
// Write the CSV data to a file or create it if it doesn't exist
const csvFilePath = './backup/villagesData.csv';
fs.writeFileSync(csvFilePath, csvData);

// Check for the existence of backup files and ensure a unique filename
let copyFilePath = './backup/villagesData_backup.csv';
let fileNumber = 1;

while (fs.existsSync(copyFilePath)) {
    // If the file exists, increment the file number and update the copyFilePath
    fileNumber++;
    copyFilePath = `./backup/villagesData_backup_${fileNumber}.csv`;
}

// Now copyFilePath contains the filename that doesn't exist yet
fs.copyFileSync(csvFilePath, copyFilePath);

        // Construct the friendly message
        const message = "🎉 Data saved successfully! 🎉\n\nYour villages data is ready for download.";

        // Send the message as the response
        res.status(200).send(message);

    } catch (error) {
        console.error('Error saving villages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});









exports.downloadCsvFile = asyncErrorHandler(async (req, res) => {
    console.log(req)
    try {
        // Fetch all villages from the database
        const villages = await Village.find();

        // Prepare CSV content header
        let csvContent = 'position,names,Donations,moreImagesUrl,moreImagesPublicId\n';

        // Iterate over villages and add their data to CSV content
        villages.forEach(village => {
            // Extract village data with defaults
            const position = village.position ? `{ lat: ${village.position.lat}, lon: ${village.position.lon} }` : 'undefined';
            const name = village.name || 'Unnamed Village';
            const donate = village.donate || 0;
            const moreImagesUrl = village.moreImages && village.moreImages.length > 0 ? village.moreImages[0].url : 'No Image';
            const moreImagesPublicId = village.moreImages && village.moreImages.length > 0 ? village.moreImages[0].publicId : 'No Public ID';
            // Concatenate village data into CSV format
            csvContent += `"${position}","${name}","${donate}","${moreImagesUrl}","${moreImagesPublicId}"\n`;
        });

        // Set response headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="villages.csv"');

        // Send the CSV content as the response
        res.status(200).send(csvContent);
    } catch (error) {
        console.error('Error Download CSV File:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});











