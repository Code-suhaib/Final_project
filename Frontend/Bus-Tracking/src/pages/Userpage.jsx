import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
      fetchLocation(selectedBus);
      interval = setInterval(() => fetchLocation(selectedBus), 10000);
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
    <div className="container mt-4 mb-5">
      <div className="text-end mb-3">
        <button className="btn btn-outline-danger rounded-pill px-4 py-2 shadow-sm" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>

      <div className="p-4 bg-light rounded shadow-sm text-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="fas fa-user-circle me-2"></i> User Dashboard
        </h2>
        <p className="text-muted mb-0">
          <i className="fas fa-envelope me-1"></i> Logged in as: <strong>{email}</strong>
        </p>
      </div>

      {/* My Bus Section */}
      <div className="card p-4 border-primary mb-4 shadow-sm">
        <h4 className="text-primary mb-3">
          <i className="fas fa-search-location me-2"></i> Track My Bus
        </h4>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter your bus number (1-8)"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleBusTrack}>
            <i className="fas fa-location-arrow me-2"></i> Track
          </button>
        </div>
      </div>

      {/* Live Bus Location */}
      {selectedBus && (
        <div className="card p-4 mb-4 shadow-sm">
          <h4 className="text-success mb-3">
            <i className="fas fa-map-marked-alt me-2"></i> Live Location of Bus #{selectedBus}
          </h4>
          {busLocation ? (
            <LoadScript googleMapsApiKey="your-api-key-here">
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

          {availableRoutes[selectedBus] && (
            <div className="mt-3">
              <h5><i className="fas fa-route me-2"></i> Route Info:</h5>
              <p><strong>Route:</strong> {availableRoutes[selectedBus].name}</p>
              <p><strong>From:</strong> {availableRoutes[selectedBus].from}</p>
              <p><strong>To:</strong> {availableRoutes[selectedBus].to}</p>
            </div>
          )}
        </div>
      )}

      {/* All Routes Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="text-info mb-3">
          <i className="fas fa-list-ul me-2"></i> All Available Routes
        </h4>
        <ul className="list-group">
          {Object.entries(availableRoutes).map(([id, route]) => (
            <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
              <span><strong>{route.name} (Bus #{id}):</strong></span>
              <span className="text-muted">{route.from} → {route.to}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Admin */}
      <div className="card p-4 shadow-sm">
        <h4 className="text-warning mb-3">
          <i className="fas fa-headset me-2"></i> Contact Admin Desk
        </h4>
        <ul className="list-unstyled">
          <li><i className="fas fa-envelope me-2 text-secondary"></i><a href="mailto:admin@busapp.com">admin@busapp.com</a></li>
          <li><i className="fas fa-phone me-2 text-secondary"></i> +91 9876543210</li>
        </ul>
      </div>
    </div>
  );
}

export default User;
