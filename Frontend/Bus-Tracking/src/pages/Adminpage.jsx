import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const allowedAdmins = ['admin1@example.com', 'admin2@example.com'];

function Admin() {
  const navigate = useNavigate();
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedBusNumber, setSelectedBusNumber] = useState('');

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!email || role !== 'admin' || !allowedAdmins.includes(email)) {
      alert('Access denied. You are not an authorized admin.');
      navigate('/login');
      return;
    }

    fetchBusData();
    const interval = setInterval(fetchBusData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBusData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buses');
      const buses = await Promise.all(
        res.data.map(async (bus) => {
          try {
            const loc = await axios.get(`http://localhost:5000/api/location/${bus.busNumber}`);
            return {
              busNumber: bus.busNumber,
              ...loc.data,
            };
          } catch {
            return { busNumber: bus.busNumber, lat: null, lng: null, updatedAt: null };
          }
        })
      );
      setBusData(buses);
    } catch (error) {
      console.error('Error fetching bus data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSelectChange = (e) => {
    const number = e.target.value;
    setSelectedBusNumber(number);
    const bus = busData.find((b) => b.busNumber === number);
    setSelectedBus(bus || null);
  };

  return (
    <div className="container mt-4">
      <div className="text-end">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <h2 className="text-center fw-bold">🛠️ Admin Dashboard</h2>
      <p className="text-center text-muted">Logged in as: {email}</p>

      <div className="row mt-4">
        {/* Bus List Panel */}
        <div className="col-md-4">
          <h5>All Buses</h5>
          <ul className="list-group">
            {busData.map((bus) => (
              <li
                key={bus.busNumber}
                className={`list-group-item ${selectedBus?.busNumber === bus.busNumber ? 'active' : ''}`}
                onClick={() => {
                  setSelectedBus(bus);
                  setSelectedBusNumber(bus.busNumber);
                }}
                style={{ cursor: 'pointer' }}
              >
                🚌 Bus #{bus.busNumber}
              </li>
            ))}
          </ul>
        </div>

        {/* Map + Details */}
        <div className="col-md-8">
          <h5>Select a Bus to Track:</h5>
          <select className="form-select mb-3" value={selectedBusNumber} onChange={handleSelectChange}>
            <option value="">-- Select Bus --</option>
            {busData.map((bus) => (
              <option key={bus.busNumber} value={bus.busNumber}>
                Bus #{bus.busNumber}
              </option>
            ))}
          </select>

          {/* Map Section */}
          <LoadScript googleMapsApiKey="you api key">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={selectedBus?.lat ? { lat: selectedBus.lat, lng: selectedBus.lng } : { lat: 18.52, lng: 73.85 }}
              zoom={selectedBus ? 14 : 11}
            >
              {selectedBus?.lat && (
                <Marker
                  position={{ lat: selectedBus.lat, lng: selectedBus.lng }}
                />
              )}
            </GoogleMap>
          </LoadScript>

          {/* Bus Info */}
          {selectedBus && (
            <div className="mt-3 border p-3 rounded shadow-sm bg-light">
              <h5>Bus #{selectedBus.busNumber} Info</h5>
              <p><strong>Latitude:</strong> {selectedBus.lat || 'Not Available'}</p>
              <p><strong>Longitude:</strong> {selectedBus.lng || 'Not Available'}</p>
              <p><strong>Last Updated:</strong> {selectedBus.updatedAt ? new Date(selectedBus.updatedAt).toLocaleString() : 'N/A'}</p>
              <p><strong>Status:</strong> {
                selectedBus.updatedAt && (new Date() - new Date(selectedBus.updatedAt)) < 30000
                  ? <span className="text-success">🟢 Online</span>
                  : <span className="text-danger">🔴 Offline</span>
              }</p>
              <p><strong>Driver:</strong> Not Assigned</p>
              <p><strong>Route:</strong> Campus → Unknown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
