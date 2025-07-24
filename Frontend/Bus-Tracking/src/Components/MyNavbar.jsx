import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function MyNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Load mode from localStorage on first render
  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('bg-dark', 'text-light');
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);

    if (newMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" className="py-3 shadow-sm">
      <Container>
        {/* Logo and Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <img
            src="/logo.jpg"
            width="60"
            height="60"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          Siddhant Bus
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Nav */}
          <Nav className="me-auto" style={{ fontSize: '1.1rem' }}>
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home me-2"></i>Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              <i className="fas fa-info-circle me-2"></i>About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <i className="fas fa-envelope me-2"></i>Contact Us
            </Nav.Link>
          </Nav>

          {/* Right Nav: Login and Theme Toggle */}
          <Nav style={{ fontSize: '1.1rem' }} className="align-items-center">
            <Nav.Link as={Link} to="/login" className="fw-semibold">
              <i className="fas fa-user-circle me-2"></i>Login / Signup
            </Nav.Link>

            {/* Dark mode toggle */}
            <Nav.Link onClick={toggleDarkMode} title="Toggle Dark Mode" style={{ cursor: 'pointer' }}>
              {darkMode ? (
                <i className="fas fa-sun text-warning"></i>
              ) : (
                <i className="fas fa-moon text-secondary"></i>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
