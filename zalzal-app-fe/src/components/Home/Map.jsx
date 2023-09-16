import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  return (
    <MapContainer center={[31.07317457220632, -8.406957080277902]} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Your marker */}
      <Marker position={[31.07317457220632, -8.406957080277902]}>  
        <Popup>
          A sample popup. Replace with your content.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
