import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const Map = () => {
  const position = [51.505, -0.09]; // Initial coordinates

  return (
    <MapContainer center={position} zoom={13} style={{ height: '250px', width: '100%', borderRadius: '30px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A sample location marker.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
