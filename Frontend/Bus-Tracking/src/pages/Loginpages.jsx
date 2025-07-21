import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('role', role);
    localStorage.setItem('email', email); // Optional: store email too

    if (role === 'admin') navigate('/admin');
    else if (role === 'driver') navigate('/driver');
    else navigate('/user');
  };

  return (
    <div className="container mt-5">
      {/* Welcome and system info */}
      <div className="mb-4 text-center">
        <h1 className="fw-bold">Welcome to Siddhant Bus Tracker</h1>
        <p className="text-muted">
          A smart and efficient way to track college buses in real-time.
          Login as <strong>User</strong>, <strong>Driver</strong>, or <strong>Admin</strong> to access your dashboard.
        </p>
      </div>

      <h2 className="mb-4">Login to Continue</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            required
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select
            className="form-select"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="user">User</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn-primary w-100 mt-3">Login</button>
      </form>
    </div>
  );
}

export default Login;
