// Map.js
import React from 'react';
import { useEffect , useState,} from 'react';
import { MapContainer, TileLayer , Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import Papa from 'papaparse'
import { DivIcon } from 'leaflet'; 
import L from 'leaflet';
import markerIcon from  './markerIcon.png'
import { Typography, Button , Paper , Box, IconButton} from '@mui/material';
import MoreInfoIcon from '@mui/icons-material/Info';
import DonateIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getAllVillagesData } from '../../actions/userAction'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Map() {
    const [pushPins, setPushPins] = React.useState([]);
    const [mapInstance, setMapInstance] = React.useState(null);
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [selectedPublicId, setSelectedPublicId] = React.useState(null);
    const [villagesData, setVillagesData] = useState([]);
    

      const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 25], // adjust the size as needed
        iconAnchor: [16, 32], // half of the size to center the icon on the marker's position
        popupAnchor: [0, -32], // position the popup above the marker
      });

     
      React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllVillagesData();
                // console.log(typeof data);
                console.log(data);  
                setVillagesData(data);
            } catch (error) {
                console.error('Error fetching village data:', error);
            }
        };
    
        fetchData(); // Call the async function immediately
    }, []);
    
    
    

    const handleBackupCSV = () => {
      console.log('Backup CSV button clicked!');
      // Add your logic for handling the backup CSV functionality here
    };
    




const handlePushpinClick = () => {
        console.log("handlePushpinClick");
};
    
const handleMoreInfoClick = (id) => {
        console.log("hansssadleMoreInfoClick");
        alert(`hello this is id : ${id}`)      
};

const handleMapCreated = (map) => {
    setMapInstance(map);
};

const handleImageClick = (publicId) => {
  setSelectedPublicId(publicId); // Update the selected public ID
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  console.log(files)
  const selectedFilesArray = Array.from(files).slice(0 , 3);
  setSelectedFiles(selectedFilesArray);
  uploadFilesToCloudinary()
};

const uploadFilesToCloudinary = async () => {
  const formData = new FormData();
  selectedFiles.forEach(file => {
      formData.append('file', file);
      formData.append('upload_preset', 'lfwld9b0');
  });

  try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dktkavyr3/image/upload', formData);
      console.log('Cloudinary upload response:', response.data);
      // Handle response from Cloudinary as needed
  } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      // Handle error as needed
  }
};

// const position = [31.07317457220632, -8.406957080277902]
const position = [31.07317457220632, -8.406957080277902]
 // Create a custom icon using the provided image

const handleDonateClick = async (id) => {
  console.log('handleDonateClick:')
} 
 

return (
  <MapContainer
    center={position}
    zoom={9.5}
    style={{ height: '700px', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />

    {villagesData.map((details, index) => (
      <Marker
        key={details._id}
        position={[details.position.lon, details.position.lat]} // lon is first and lat seconde always remember this 
        icon={customIcon} // Use this line if you want to use a custom icon
      >

<Popup>
        <Paper style={{ width: '90%', padding: '10px', maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            position='relative'
            cursor="pointer"
          >
            add images!
            <IconButton color="primary"  
              onClick={() => handleImageClick(details?.publicId)} // Pass the public ID to the click handler
            >
              <AddPhotoAlternateIcon />
            </IconButton> 
            <input
              id="fileInput"
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.*"
              style={{ display: 'none' }}
              multiple
              onChange={handleFileChange}
            />
            <Box
              key={details._id}
              sx={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '20px',
                width:'100%',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', width: '80%', height: 'auto', whiteSpace: 'nowrap' }}>
                <LocationOnIcon sx={{ marginRight: '5px' }} color="primary" /> {details.name}
              </Typography>
              
              <Typography variant="body1" sx={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <MonetizationOnIcon sx={{ marginRight: '5px' }} color="primary" />
                {details.donate}
              </Typography>

              {/* Display the image only if moreImages is not empty */}
              {details.moreImages && details.moreImages.length > 0 ? (
                <img
                  src={details?.moreImages[0].url} // Use the first image if available
                  alt='Village'
                  style={{ maxWidth: '100%', borderRadius: '5px' }}
                />
              ) : (
                <img
                  src='https://res.cloudinary.com/dktkavyr3/image/upload/v1707411973/w3fug2ahr96x9jcesrwp.jpg' // Default image URL
                  alt='Default Village'
                  style={{ maxWidth: '100%', borderRadius: '5px' }}
                />
              )}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                  alignItems: 'center',
                  flexDirection:'coulmn',
                  width:'100%',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MoreInfoIcon />}  
                  onClick={() => handleMoreInfoClick(details._id)}
                >
                  More Info
                </Button>
                <Link to='CheckOut'>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DonateIcon />}
                  >
                    Donate
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Popup>
      </Marker>
    ))}
  </MapContainer>
);




}

export default Map;
