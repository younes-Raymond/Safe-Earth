const app = require('./app');
const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 4000;
const fs = require('fs');
const  Tesseract  = require('tesseract.js');
const multer = require('multer');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});


// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});










  





const performOCR = async () => {
    const directoryPath = './accenture-company';
    const startImage = 44;
    const endImage = 45;

    for (let i = startImage; i <= endImage; i++) {
        try {
            const imagePath = path.join(directoryPath, `IMG_${i.toString().padStart(4, '0')}.jpg`);

            // Perform OCR on the image
            const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

            console.log(`Recognized Text for ${imagePath}:`, text);

            // Save the recognized text to a .txt file
            const outputPath = path.join('./templates', `test_${i.toString().padStart(4, '0')}.txt`);
            fs.writeFileSync(outputPath, text);

            console.log(`Text saved at: ${outputPath}`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
};



// // Call the performOCR function
// performOCR();







