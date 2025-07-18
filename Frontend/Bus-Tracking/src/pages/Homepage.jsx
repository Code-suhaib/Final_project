import React from "react";
import MyNavbar from "../Components/MyNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import busImage from '../assets/bus.jpg'; 


function Homepage() {
  return (
    <>
      <MyNavbar />
    {/* Hero Section */}
      <div style={{
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",      
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
}}>

   <Container>
  <h1 style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: "Montserrat" }}>
    Real-Time College Bus Tracking
  </h1>
  <p style={{ fontSize: "1.25rem", margin: "20px 0", fontFamily: "Montserrat" }}>
    Know exactly where your ride is  – anytime, anywhere.
  </p>
  <Button variant="primary" size="lg" href="#track" style={{ fontFamily: "Montserrat" }}>
    Track Now
  </Button>
</Container>

      </div>

     {/* About Section */}
<Container className="my-5 px-3" id="about">
  <Row className="align-items-center">
    <Col xs={12} md={6} className="mb-4 mb-md-0">
      <img
        src={busImage}
        alt="Bus Tracking"
        className="img-fluid rounded shadow"
        style={{ width: "100%", height: "auto", maxHeight: "350px", objectFit: "cover" }}
      />
    </Col>

    <Col xs={12} md={6}>
      <h2 className="mb-3">About the App</h2>
      <p style={{ fontSize: "23px" }}>
        The <strong>Siddhant Bus Tracking App</strong> is designed to ensure student safety,
        convenience, and punctuality by offering real-time tracking of college buses.
        Whether you're a student, parent, or staff member, you can view the exact bus location,
        route progress, and estimated arrival times directly from your mobile device.
      </p>
      <p style={{ fontSize: "23px" }}>
        Our app is mobile-optimized, ensuring smooth performance on all screen sizes.
        No need to wait at stops blindly — get live updates, stay informed, and plan your
        schedule better with Siddhant Bus.
      </p>
      <ul style={{ fontSize: "23px" }}>
        <li>🚍 Real-time GPS tracking</li>
        <li>📱 Mobile-first responsive design</li>
        <li>🔔 Live notifications and alerts</li>
        <li>🔐 Secure login for users, drivers, and admins</li>
      </ul>
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
