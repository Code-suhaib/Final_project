import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Driver() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const busNumber = localStorage.getItem('busNumber') || '1'; // driver should log in with assigned bus

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          setLocation({ lat, lng });

          try {
            await axios.post('http://localhost:5000/api/update-location', {
              busNumber,
              latitude: lat,
              longitude: lng,
            });
            console.log('Location updated');
          } catch (error) {
            console.error('Error updating location:', error);
          }
        });
      }
    };

    updateLocation(); // initial call
    const interval = setInterval(updateLocation, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [busNumber]);

  return (
    <div className="container mt-5">
      <h2>Driver Dashboard</h2>
      <p>Bus Number: {busNumber}</p>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
}

export default Driver;
