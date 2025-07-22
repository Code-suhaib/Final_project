import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Mock bus locations (simulate GPS)
const busLocations = {
  1: { lat: 18.5204, lng: 73.8567 }, // Route A
  2: { lat: 18.508, lng: 73.831 },   // Route B
  3: { lat: 18.613, lng: 73.712 },   // Route C
  4: { lat: 18.490, lng: 73.850 },
  5: { lat: 18.540, lng: 73.760 },
  6: { lat: 18.560, lng: 73.800 },
  7: { lat: 18.570, lng: 73.820 },
  8: { lat: 18.585, lng: 73.740 },
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

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!email || role !== 'user') {
      navigate('/login');
    }
  }, [email, role, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleBusTrack = () => {
    if (busNumber < 1 || busNumber > 8) {
      alert("Please enter a valid bus number between 1 and 8.");
      return;
    }
    setSelectedBus(parseInt(busNumber));
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
        <h4>My Bus</h4>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter your bus number (1-8)"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleBusTrack}>
            Track My Bus
          </button>
        </div>
      </div>

      {/* Live Bus Location */}
      {selectedBus && (
        <div className="mt-5">
          <h4>Live Location of Bus #{selectedBus}</h4>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={busLocations[selectedBus]}
              zoom={13}
            >
              <Marker position={busLocations[selectedBus]} />
            </GoogleMap>
          </LoadScript>

          {/* Show route details */}
          <div className="mt-3">
            <h5>Route Info:</h5>
            <p><strong>Route:</strong> {availableRoutes[selectedBus].name}</p>
            <p><strong>From:</strong> {availableRoutes[selectedBus].from}</p>
            <p><strong>To:</strong> {availableRoutes[selectedBus].to}</p>
          </div>
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
        <p>If you have issues, please contact us at:</p>
        <ul>
          <li>Email: <a href="mailto:admin@busapp.com">admin@busapp.com</a></li>
          <li>Phone: +91 9876543210</li>
        </ul>
      </div>
    </div>
  );
}

export default User;
