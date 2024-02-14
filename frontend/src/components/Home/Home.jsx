import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Map from './Map';
import NavBar from '../Layouts/NavBar';
import './style/Home.css'

function HomePage() {

  return (
    <div>
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
