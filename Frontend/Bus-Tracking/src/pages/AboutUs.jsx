import MyNavbar from '../Components/MyNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import busImage from '../assets/bus.jpg';

function AboutUs(){
    return(
        <>
           <MyNavbar/>
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
</>
    )
}
export default AboutUs