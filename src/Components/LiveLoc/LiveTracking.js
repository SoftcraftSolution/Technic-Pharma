import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveTracking.css';
import L from 'leaflet';
import riderIcon from './sales.png'; // Replace with actual paths
import io from 'socket.io-client';
import hospitalIcon from './hospital.png'; // Replace with actual path
import Sidebar from '../Sidebar/sidebar';

// Custom icons
const createIcon = (iconUrl) => new L.Icon({
  iconUrl,
  iconSize: [50, 50], 
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});
const hospitalMarkerIcon = createIcon(hospitalIcon);
const riderMarkerIcon = createIcon(riderIcon);

const socket = io('https://technicfarmalivetracking-1.onrender.com', {
  transports: ['websocket']
});

let email = "";
function handleChange(e) {
  email = e.target.value;
}

function onSearch() {
  if (socket.connected) {
    if (email.includes('@')) {
      console.log("Going to emit the event");
      socket.emit("watchDocument", email);
      console.log({email});

    } else {
      alert("Invalid email");
    }
  }
}

const MapPage = () => {
  const [markerPositions, setMarkerPositions] = useState([19.3817169, 72.8307487]);
  console.log([markerPositions[0], markerPositions[1]]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('documentUpdated', (data) => {
      console.log( data);
      const { lat, log } = data;

      // Validate latitude and longitude
      if (!isNaN(lat) && !isNaN(log)) {
        setMarkerPositions([Number(lat), Number(log)]);
      } else {
        console.error('Invalid latitude or longitude:', { lat, log });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Sidebar />
      <div className="map-page">
        <header className="map-header">
          <input type="text" placeholder="Search by Email" className="search-input" onChange={handleChange} />
          <div className='Search'>
            <button onClick={onSearch}>Search</button>
          </div>
        </header>
        <MapContainer center={[markerPositions[0], markerPositions[1]]} zoom={18} className="map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[markerPositions[0], markerPositions[1]]} icon={riderMarkerIcon}>
            <Popup>SalesMan Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
