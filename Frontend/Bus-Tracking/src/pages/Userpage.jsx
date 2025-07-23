import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const availableRoutes = {
  1: { name: "Route A", from: "Campus", to: "Katraj" },
  2: { name: "Route B", from: "Campus", to: "Swargate" },
  3: { name: "Route C", from: "Campus", to: "Pimpri" },
  4: { name: "Route D", from: "Campus", to: "Shivaji Nagar" },
  5: { name: "Route E", from: "Campus", to: "Kothrud" },
  6: { name: "Route F", from: "Campus", to: "Warje" },
  7: { name: "Route G", from: "Campus", to: "Baner" },
  8: { name: "Route H", from: "Campus", to: "Hadapsar" },
};

function User() {
  const navigate = useNavigate();
  const [busNumber, setBusNumber] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [busLocation, setBusLocation] = useState(null);
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!email || role !== 'user') {
      navigate('/login');
    }
  }, [email, role, navigate]);

  useEffect(() => {
    let interval;
    if (selectedBus) {
      fetchLocation(selectedBus); // initial call
      interval = setInterval(() => fetchLocation(selectedBus), 10000); // refresh every 10s
    }
    return () => clearInterval(interval);
  }, [selectedBus]);

  const fetchLocation = async (busNum) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/location/${busNum}`);
      setBusLocation({ lat: res.data.lat, lng: res.data.lng });
      setError('');
    } catch (err) {
      setError('Unable to fetch bus location.');
      setBusLocation(null);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleBusTrack = () => {
    const num = parseInt(busNumber);
    if (isNaN(num) || num < 1 || num > 8) {
      alert("Please enter a valid bus number between 1 and 8.");
      return;
    }
    setSelectedBus(num);
  };

  return (
    <div className="container mt-4">
      <div className="text-end">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <h2 className="text-center fw-bold">🚌 User Dashboard</h2>
      <p className="text-center text-muted">Logged in as: {email}</p>

      {/* My Bus Section */}
      <div className="mt-4">
        <h4>Track My Bus</h4>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter your bus number (1-8)"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleBusTrack}>
            Track Bus
          </button>
        </div>
      </div>

      {/* Live Bus Location */}
      {selectedBus && (
        <div className="mt-5">
          <h4>Live Location of Bus #{selectedBus}</h4>
          {busLocation ? (
            <LoadScript googleMapsApiKey=" your api key ">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={busLocation}
                zoom={14}
              >
                <Marker position={busLocation} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <p className="text-danger">{error}</p>
          )}

          {/* Show route details */}
          {availableRoutes[selectedBus] && (
            <div className="mt-3">
              <h5>Route Info:</h5>
              <p><strong>Route:</strong> {availableRoutes[selectedBus].name}</p>
              <p><strong>From:</strong> {availableRoutes[selectedBus].from}</p>
              <p><strong>To:</strong> {availableRoutes[selectedBus].to}</p>
            </div>
          )}
        </div>
      )}

      {/* All Routes Section */}
      <div className="mt-5">
        <h4>All Available Routes</h4>
        <ul className="list-group">
          {Object.entries(availableRoutes).map(([id, route]) => (
            <li key={id} className="list-group-item">
              <strong>{route.name} (Bus #{id}):</strong> {route.from} → {route.to}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Admin */}
      <div className="mt-5">
        <h4>Contact Admin Desk</h4>
        <ul>
          <li>Email: <a href="mailto:admin@busapp.com">admin@busapp.com</a></li>
          <li>Phone: +91 9876543210</li>
        </ul>
      </div>
    </div>
  );
}

export default User;
