import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Map from './Map';
import { getUserLocation } from '../../utils/getLocation';
import {sendLocation } from '../../actions/userAction'

function HomePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [newWatchId, setnewWatchId] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  useEffect(() => {
  getLocation()
  }, []); 

  let watchId = null;

  const getLocation = async (materialId) => {  
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
    try {
      const newWatchId = navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setlatitude(+latitude);
          setlongitude(+longitude)
          console.log('latitude:', latitude, 'longtitude', longitude)
          sendLocation(latitude, longitude);

        },
        (error) => {
          console.error('Error getting current position:', error);
          if (error.message.includes('User denied Geolocation')) {
            // Ask for GPS permission again
            // askForGPSPermission(materialId);
          } else {
            // getLocationByIP(materialId); // argument materialID 
          }
        },
        { enableHighAccuracy: true }
      );
      setnewWatchId(newWatchId);
    } catch (error) {
      console.error('Error accessing geolocation:', error);
      // Handle the error here and call the function to get location by IP
    //   getLocationByIP(materialId);
    }
  };

  
  return (
    <div>
      <div className="Menu-Container">
        <Menu />
      </div>
      <div className="Map-container">
        {/* Pass userLocation as a prop to the Map component */}
        {/* <Map userLocation={userLocation} /> */}
      </div>
    </div>
  );
}

export default HomePage;
