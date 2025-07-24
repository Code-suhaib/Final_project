import React from 'react';
import { Link } from 'react-router-dom';
import MyNavbar from "../Components/MyNavbar";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage() {
  const isDark = localStorage.getItem('theme') === 'dark';

  return (
    <>
      <MyNavbar />

      <div
        className={`d-flex flex-column justify-content-center align-items-center text-center ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'}`}
        style={{ minHeight: '70vh', padding: '4rem 1rem' }}
      >
        <h1 className="display-4 fw-bold text-primary mb-3">
          <i className="fas fa-bus me-2"></i>Real-Time College Bus Tracking
        </h1>
        <p className={`lead ${isDark ? 'text-light' : 'text-muted'} mb-4`}>
          Know exactly where your ride is — anytime, anywhere.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
          <i className="fas fa-location-arrow me-2"></i> Track Now
        </Link>
      </div>

      <section className={`${isDark ? 'bg-secondary text-white' : 'bg-white text-dark'} py-5`} id="features">
        <div className="container">
          <h2 className="text-center mb-4">
            <i className="fas fa-cogs me-2 text-info"></i>Features
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <i className="fas fa-satellite-dish fa-2x text-primary mb-2"></i>
              <h5>Real‑Time GPS</h5>
              <p>Track your bus live on the map with ease.</p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="fas fa-mobile-alt fa-2x text-primary mb-2"></i>
              <h5>Mobile Friendly</h5>
              <p>Responsive design for all devices.</p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="fas fa-lock fa-2x text-primary mb-2"></i>
              <h5>Secure Login</h5>
              <p>Dedicated panels for Admin, Driver, and User roles.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={`text-center py-4 ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'} mt-5`}>
        <p className="mb-1">© 2025 Siddhant Bus Tracker</p>
        <p>
          Designed and developed by <strong>Divya</strong>, <strong>Kajal</strong> & <strong>Rehan</strong>
        </p>
      </footer>
    </>
  );
}

export default Homepage;
