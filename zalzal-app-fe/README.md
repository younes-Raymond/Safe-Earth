Certainly, here's an updated README for your project:

---

# Disaster Relief Web Application

This web application is designed to assist with disaster relief efforts by providing information on affected areas, villages, and the level of damage incurred. It allows users to search for villages, view their locations on a map, and filter results by damage severity.

## Getting Started

To run the application, follow these steps:

1. **Backend Setup**

   - Navigate to the `/backend` directory:
     ```
     cd backend
     ```

   - Start the Node.js server:
     ```
     node server.js
     ```
     or
     ```
     npx nodemon server.js
     ```

2. **Frontend Setup**

   - Navigate to the `/frontend` directory:
     ```
     cd frontend
     ```

   - Start the React app:
     ```
     npm start
     ```

3. **Dependencies**

   The application uses various dependencies, including:

   **Backend Dependencies:**
   - "@sendgrid/mail"
   - "axios"
   - "bcrypt"
   - "body-parser"
   - "cloudinary"
   - "concurrently"
   - "cookie-parser"
   - "csv-parser"
   - "dotenv"
   - "express"
   - "express-fileupload"
   - "firebase-admin"
   - "form-data"
   - "jsonwebtoken"
   - "mongoose"
   - "multer"
   - "multer-storage-cloudinary"
   - "nodemailer"
   - "paytmchecksum"
   - "stripe"
   - "uuid"
   - "validator"

   **Frontend Dependencies:**
   - "@emotion/react"
   - "@emotion/styled"
   - "@mui/icons-material"
   - "@mui/material"
   - "@mui/x-data-grid"
   - "@reduxjs/toolkit"
   - "axios"
   - "bingmaps-react"
   - "concurrently"
   - "geolib"
   - "papaparse"
   - "react"
   - "react-dom"
   - "react-redux"
   - "react-router-dom"
   - "react-scripts"
   - "yup"

## Features

### 1. Map Component

- The map component displays villages and their locations.
- Users can search for a specific village.
- Pushpins on the map represent villages and their damage levels.
- Villages can be filtered by damage severity (high, medium, low).

### 2. Navbar Component

- The navbar provides navigation options and a search feature.
- Users can enter a village name in the search bar to find it on the map.

### 3. Menu Component

- The menu component offers options for filtering villages by damage level.
- Users can select from high, medium, and low damage filters to refine the map view.

### 4. Home Container

- The home container renders the main application interface.
- It allows users to search for villages, view their locations on the map, and filter results by damage severity.
- Users can also set the center of the earthquake and specify the CSV file containing village data.

## Contributing

This project is open for contributions. Feel free to enhance and improve the application's functionality or user interface. If you have ideas or suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

