import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? 'register' : 'login';

    try {
      const res = await axios.post(`http://localhost:5000/api/${endpoint}`, {
        email,
        password,
        role
      });

      alert(res.data.message);

      if (!isRegister) {
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);

        if (role === 'admin') navigate('/admin');
        else if (role === 'driver') navigate('/driver');
        else navigate('/user');
      } else {
        // Clear form after register
        setPassword('');
        setIsRegister(false);
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 text-center">
        <h1 className="fw-bold">Welcome to Siddhant Bus Tracker</h1>
        <p className="text-muted">
          Track your college bus in real-time. {isRegister ? "Register as" : "Login as"} 
          <strong> User</strong>, <strong>Driver</strong>, or <strong>Admin</strong>.
        </p>
      </div>

      <h2 className="mb-4">{isRegister ? "Register" : "Login"} to Continue</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            required
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            required
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn-primary w-100 mt-3">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          className="btn btn-link"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? 'Already have an account? Login'
            : "First time here? Register"}
        </button>
      </div>
    </div>
  );
}

export default Login;
