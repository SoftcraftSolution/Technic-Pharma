
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


const socket = io('http://localhost:3001', {
  transports: ['websocket']
});
let phoneNumber="";
function handleChange(e){
  
    phoneNumber=e.target.value;
  }
  




function onSearch(){
  if(socket.connected){
    if(phoneNumber.length===10){
      console.log("Going to emit the event");
      socket.emit("phoneNumber",Number(phoneNumber));
    }
    else{
      alert("Invalid number");
    }
    
  }
}
const MapPage = () => {
  const [markerPositions, setMarkerPositions] = useState([19.3817169,72.8307487]);
  console.log([markerPositions[0],markerPositions[1]]);

  useEffect(() => {
    // console.log(markerPositions[1]);
    // console.log(" in useEffect");
    
    socket.connect();
    // console.log(socket.connected);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      socket.on('driverLocation', (data) => {
        // console.log("we get the driver live location...");
        // console.log( "latitude "+ typeof data.latitude);
        // console.log( "longitude "+ typeof data.longitude);
        setMarkerPositions([Number(data.latitude),Number(data.longitude)]);
      });
      // Perform any actions needed after connection is established
    });
  
    

    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return (
    <div className="App">
      <Sidebar/>
    <div className="map-page">
      <header className="map-header">
        <input type="text" placeholder="Search" className="search-input" onChange={handleChange} />
        <div className='Search'>
          <button onClick={onSearch}>Search</button>

        </div>
      </header>
      <MapContainer center={[markerPositions[0],markerPositions[1]]} zoom={18} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Example Markers */}
        <Marker position={[markerPositions[0],markerPositions[1]]} icon={riderMarkerIcon}>
          <Popup>Rider Location</Popup>
        </Marker>
        {/* <Marker position={[19.0550, 72.8625]} icon={riderMarkerIcon}>
          <Popup>Rider Location</Popup>
        </Marker><Marker position={[19.0960, 72.8777]} icon={riderMarkerIcon}>
          <Popup>Rider Location</Popup>
        </Marker> */}
        
        {/* <Marker position={[19.0960, 72.8777]} icon={hospitalMarkerIcon}>
          <Popup>Hospital Location</Popup>
        </Marker>
        <Marker position={[19.0550, 72.8625]} icon={hospitalMarkerIcon}>
          <Popup>Hospital Location</Popup>
        </Marker>
        <Marker position={[19.0250, 72.8425]} icon={hospitalMarkerIcon}>
          <Popup>Hospital Location</Popup>
        </Marker>
        <Marker position={[19.0010, 72.9100]} icon={hospitalMarkerIcon}>
          <Popup>Hospital Location</Popup>
        </Marker> */}
        
      </MapContainer>
    </div>
    </div>
  );
};

export default MapPage;