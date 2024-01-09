// Map.js
import React from 'react';
import { useEffect , useState } from 'react';
import { MapContainer, TileLayer , Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse'
import { DivIcon } from 'leaflet'; 
import L from 'leaflet';
import VillageData from './Douars50km.csv' 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { renderToStaticMarkup } from 'react-dom/server';
import markerIcon from  './markerIcon.png'
import { Typography, Button , Paper , Box} from '@mui/material';
import MoreInfoIcon from '@mui/icons-material/Info';
import DonateIcon from '@mui/icons-material/AttachMoney';
function Map() {
    const [pushPins, setPushPins] = React.useState([]);
    const [mapInstance, setMapInstance] = useState(null);


    const CenterEarthQuake = {
        lat: 31.07317457220632,
        lon: -8.406957080277902,
      }

      const handleDonateClick = () => {
        alert('Thank you for considering a donation! Your support helps us make a positive impact in the community. Your generosity allows us to continue our mission and provide valuable services to those in need. We deeply appreciate your contribution! 🌟💙');
      }
      


      const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [30, 30], // adjust the size as needed
        iconAnchor: [16, 32], // half of the size to center the icon on the marker's position
        popupAnchor: [0, -32], // position the popup above the marker
      });


   

      useEffect(() => {
        const fetchParseData = async () => {
          Papa.parse(VillageData, {
            download: true,
            delimiter: ',',
            complete: (result) => {
              console.log(result.data); // Log the parsed data to check its structure
      
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
  <Paper style={{ width: '200px', padding: '10px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">{pin.options.title}</Typography>
      <Typography variant="h6">{pin.position}</Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      startIcon={<MoreInfoIcon />}
      onClick={handleMoreInfoClick}
    >
      More Info
    </Button>
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DonateIcon />}
      onClick={handleDonateClick}
    >
      Donate
    </Button>
  </Paper>
</Popup>


      </Marker>
    ))}

    </MapContainer>
  );




}

export default Map;
