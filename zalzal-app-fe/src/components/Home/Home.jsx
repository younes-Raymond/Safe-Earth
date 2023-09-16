import React from 'react';
import Menu from './Menu';
import Map from './Map'

function HomePage() {
  return (
    <div>

        <div className="Menu-Container">
        <Menu />
        </div>
        <div className="Map-container">
      <Map /> 
        </div>
    </div>
  );
}

export default HomePage;
