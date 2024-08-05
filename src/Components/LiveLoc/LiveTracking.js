import React, { useEffect, useState } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import io from 'socket.io-client';
import SideBar from '../Sidebar/sidebar';
import styled from 'styled-components';
import useLoadScript from './useLoadScript'; // Import the custom hook

// Set up socket connection
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
      console.log({ email });
    } else {
      alert("Invalid email");
    }
  } else {
    console.error("Socket not connected");
  }
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyBd4z2gXxOiMPdtXS31nlQmaYeBGgguAxw'; // Ensure this key is correct and unrestricted
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 250px; /* Adjust as needed */
  background-color: #f0f0f0; /* Adjust as needed */
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
`;

const Header = styled.header`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  display: flex;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SearchButtonContainer = styled.div`
  margin-left: 10px;
`;

const MapPage = () => {
  const [markerPosition, setMarkerPosition] = useState({ lat: 19.3817169, lng: 72.8307487 });
  const scriptLoaded = useLoadScript(GOOGLE_MAPS_API_URL);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('documentUpdated', (data) => {
      console.log('Received data:', data);
      const { lat, log } = data;

      // Validate latitude and longitude
      if (!isNaN(lat) && !isNaN(log)) {
        console.log('Updating marker position:', { lat, log });
        setMarkerPosition({ lat: Number(lat), lng: Number(log) });
      } else {
        console.error('Invalid latitude or longitude:', { lat, log });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AppContainer>
      <SidebarContainer>
        <SideBar />
      </SidebarContainer>
      <MapContainer>
        <Header>
          <SearchInput type="text" placeholder="Search by Email" onChange={handleChange} />
          <SearchButtonContainer className='Search'>
            <button onClick={onSearch}>Search</button>
          </SearchButtonContainer>
        </Header>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }} // Ensure map container has size
          center={markerPosition}
          zoom={18}
          options={{
            gestureHandling: 'greedy', // Optional: Improve map interaction experience
            disableDefaultUI: false // Optional: Customize map controls
          }}
        >
          <MarkerF position={markerPosition} />
        </GoogleMap>
      </MapContainer>
    </AppContainer>
  );
};

export default MapPage;
