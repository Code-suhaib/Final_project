import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from "../Components/MyNavbar";

function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Email Regex (RFC 5322 basic pattern)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        setPassword('');
        setIsRegister(false);
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="container mt-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold">Welcome to Siddhant Bus Tracker</h1>
          <p className="text-muted">
            Track your college bus in real-time. {isRegister ? "Register as" : "Login as"}
            <strong> User</strong>, <strong>Driver</strong>, or <strong>Admin</strong>.
          </p>
        </div>

        <h2 className="mb-4">{isRegister ? "Register" : "Login"} to Continue</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
            onClick={() => {
              setIsRegister(!isRegister);
              setErrors({});
            }}
          >
            {isRegister
              ? 'Already have an account? Login'
              : "First time here? Register"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
