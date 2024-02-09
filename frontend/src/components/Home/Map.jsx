// Map.js
import React from 'react';
import { useEffect , useState,} from 'react';
import { MapContainer, TileLayer , Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import Papa from 'papaparse'
import { DivIcon } from 'leaflet'; 
import L from 'leaflet';
import VillageData from './Douars50km.csv' 
import {LocationOnIcon} from '@mui/icons-material';
import { renderToStaticMarkup } from 'react-dom/server';
import markerIcon from  './markerIcon.png'
import { Typography, Button , Paper , Box, IconButton} from '@mui/material';
import MoreInfoIcon from '@mui/icons-material/Info';
import DonateIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function Map() {
    const [pushPins, setPushPins] = React.useState([]);
    const [mapInstance, setMapInstance] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedPublicId, setSelectedPublicId] = useState(null);



      const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 25], // adjust the size as needed
        iconAnchor: [16, 32], // half of the size to center the icon on the marker's position
        popupAnchor: [0, -32], // position the popup above the marker
      });

     

      useEffect(() => {
        const fetchParseData = async () => {
          Papa.parse(VillageData, {
            download: true,
            delimiter: ',',
            complete: (result) => {
              // console.log(result.data); // Log the parsed data to check its structure
      
              const parsedData = result.data
                .filter((row) => !isNaN(parseFloat(row[1])) && !isNaN(parseFloat(row[0])))
                .map((row) => ({
                  latitude: parseFloat(row[1]),
                  longitude: parseFloat(row[0]),
                  name: row[2],
                }));
      
              const pushPinsData = parsedData.map((village) => ({
                position: [village.latitude, village.longitude],
                options: {
                  title: village.name,
                  imageUrl:'https://res.cloudinary.com/dktkavyr3/image/upload/v1707411973/w3fug2ahr96x9jcesrwp.jpg'
                },

              }));
      
              setPushPins(pushPinsData);
            },
          });
        };
        fetchParseData();
      }, [mapInstance]);
      



const handlePushpinClick = () => {
        console.log("handlePushpinClick");
};
    
const handleMoreInfoClick = () => {
        console.log("hansssadleMoreInfoClick");
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




const position = [31.07317457220632, -8.406957080277902]
 // Create a custom icon using the provided image


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

      {pushPins.map((pin, index) => (
      <Marker
        key={index}
        position={pin.position}
        icon={customIcon}
      >
     
     <Popup>
     <Paper style={{ width: '90%', padding: '10px', maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                position='relative'
                                cursor="pointer"
                                onClick={() => handleImageClick(pin.publicId)} // Pass the public ID to the click handler
                            >
                                
                                    add images!
                        <IconButton color="primary">
                          <AddPhotoAlternateIcon />
                        </IconButton>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.gif,.*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    multiple
                                />
                                <Typography variant="h6">{pin.options.title}</Typography>
                                <Typography variant="h6">{pin.position}</Typography>

                                <img
                                    src={pin.options.imageUrl}
                                    alt='Default ImgVillage'
                                    style={{maxWidth:'100%', margin:'10px', borderRadius:'5px'}}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<MoreInfoIcon />}
                                onClick={handleMoreInfoClick}
                                style={{ marginBottom: '10px' }}
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
                        </Paper>
                    </Popup>
      </Marker>
    ))}

    </MapContainer>
  );




}

export default Map;
