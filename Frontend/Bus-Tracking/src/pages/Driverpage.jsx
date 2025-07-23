import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Driver() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [busNumber, setBusNumber] = useState('');
  const [buses, setBuses] = useState([]);
  const [tracking, setTracking] = useState(false);

  // Fetch available buses on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/buses')
      .then(res => setBuses(res.data))
      .catch(err => console.error('Error fetching buses:', err));
  }, []);

  // Track location only when a bus is selected
  useEffect(() => {
    if (!tracking || !busNumber) return;

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

    updateLocation(); // initial
    const interval = setInterval(updateLocation, 10000); // every 10s
    return () => clearInterval(interval);
  }, [busNumber, tracking]);

  const handleBusSelection = (e) => {
    setBusNumber(e.target.value);
    setTracking(true);
  };

  return (
    <div className="container mt-5">
      <h2>Driver Dashboard</h2>

      {!busNumber && (
        <div className="mb-3">
          <label className="form-label">Select a Bus to Start</label>
          <select className="form-select" onChange={handleBusSelection} defaultValue="">
            <option value="" disabled>Select Bus</option>
            {buses.map((bus, index) => (
              <option key={index} value={bus.number || bus.busNumber}>
                Bus {bus.number || bus.busNumber}
              </option>
            ))}
          </select>
        </div>
      )}

      {busNumber && (
        <>
          <p><strong>Tracking Bus:</strong> {busNumber}</p>
          <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lng}</p>
        </>
      )}
    </div>
  );
}

export default Driver;
