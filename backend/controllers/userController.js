const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Village = require('../models/villageModel');
const Papa = require('papaparse');
const fs = require('fs');
const User = require('../models/userModel');


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



exports.signUpUser = asyncErrorHandler(async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, email, password, receiveUpdates } = req.body;
        // Create a new instance of the User model with the form data
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            emailAddress: email,
            password: password,
            receiveUpdates: receiveUpdates
        });

        // Save the user to the database
        await user.save();

        // Optionally, you can generate a JWT token for the user and return it
        const token = user.generateAuthToken();

        return res.status(201).json({ user, token }); // Return the user and token
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.emailAddress) {
            return res.status(400).json({ message: 'Email address is already in use.' });
        } else {
            console.log('Error signing up user:', error);
            return res.status(500).json({ message: 'An error occurred while signing up the user.' });
        }
    }
});


exports.signInUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ emailAddress: email });

    if (!user) {
        // User not found
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        // Password does not match
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Password is correct, sign in successful
    // Optionally, you can generate a JWT token for the user and return it
    const token = user.generateAuthToken();

    return res.status(200).json({ message: 'Sign-in successful', token: token });
});


exports.updatedetails = asyncErrorHandler(async (req, res) => {
    console.log(req.body)
  // Extract data from the request body
  const { url, public_id } = req.body;

  try {
    // Find all village documents
    const villages = await Village.find();

    if (!villages || villages.length === 0) {
      return res.status(404).json({ message: 'No villages found' });
    }

    // Update moreImages field for each village document
    const updatedVillages = await Promise.all(villages.map(async (village) => {
      village.moreImages.push({ publicId: public_id, url: url });
      await village.save();
      return village.toObject(); // Convert Mongoose document to plain JavaScript object
    }));

    // Respond with success message and updated villages data
    return res.status(200).json({ message: 'All villages updated successfully', villages: updatedVillages });
  } catch (error) {
    console.error('Error updating villages:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});









exports.savesettings = asyncErrorHandler(async (req, res) => {
    // Send response back to the client
    res.status(200).json({ message: "hey i got the req thanks" });
});










































// exports.updatedetails = asyncErrorHandler(async (req, res) => {
//   // Extract data from the request body
//   const { url, public_id, documentId } = req.body;

//   try {
//     // Find the village document based on the documentId
//     const village = await Village.findById(documentId);

//     if (!village) {
//       return res.status(404).json({ message: 'Village not found' });
//     }

//     // Push the new image data to the moreImages array
//     village.moreImages.push({ publicId: public_id, url: url });

//     // Save the updated village document
//     await village.save();

//     // Respond with success message
//     return res.status(200).json({ message: 'Village updated successfully' });
//   } catch (error) {
//     console.error('Error updating village:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });












