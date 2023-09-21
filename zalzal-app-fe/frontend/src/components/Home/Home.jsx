import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Map from './Map';
import { getUserLocation } from '../../utils/getLocation';
import {sendLocation } from '../../actions/userAction'
import NavBar from '../Layouts/NavBar';
import './style/Home.css'

function HomePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [newWatchId, setnewWatchId] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  useEffect(() => {
//   getLocation()
  }, []); 


  
  return (
    <div>
       <div className="NavBar">
        <NavBar />
      </div>
    
      <div className="Menu-Container">
        <Menu />
      </div>
     
      <div className="Map-container" >
  <Map />
</div>
    </div>
  );
}

export default HomePage;
