import React from "react";
import MyNavbar from "../Components/MyNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

function Homepage() {
  return (
    <>
      <MyNavbar />

      {/* Hero Section */}
      <div style={{
        backgroundColor: "#f8f9fa",
        padding: "60px 0",
        textAlign: "center"
      }}>
        <Container>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Real-Time College Bus Tracking
          </h1>
          <p style={{ fontSize: "1.25rem", margin: "20px 0" }}>
            Know exactly where your ride is – anytime, anywhere.
          </p>
          <Button variant="primary" size="lg" href="#track">
            Track Now
          </Button>
        </Container>
      </div>

      {/* About Section */}
      <Container className="my-5" id="about">
        <Row>
          <Col md={6}>
            <img
              src="/bus-tracking.jpg"
              alt="Bus Tracking"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <h2>About the App</h2>
            <p>
              Our college bus tracking system offers real-time GPS-based tracking
              for students, staff, and drivers. Stay updated on bus location,
              route status, and arrival times right from your mobile or desktop.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <div style={{ backgroundColor: "#e9ecef", padding: "40px 0" }} id="features">
        <Container>
          <h2 className="text-center mb-4">Features</h2>
          <Row>
            <Col md={4}>
              <h5>🛰️ Real-Time GPS</h5>
              <p>Track your bus live on the map.</p>
            </Col>
            <Col md={4}>
              <h5>📱 Mobile Friendly</h5>
              <p>Responsive design for all devices.</p>
            </Col>
            <Col md={4}>
              <h5>🔒 Secure Login</h5>
              <p>Dedicated panels for admin, driver, and user.</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-light mt-5">
        <p className="mb-0">© 2025 Siddhant Bus Tracker. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Homepage;
