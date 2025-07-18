import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="py-3">
        <Container>
          {/* Logo and Brand */}
          <Navbar.Brand href="#home" className="d-flex align-items-center" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <img
              src="/logo.jpg"  // Ensure this path is correct or import the image if using local asset
              width="60"
              height="60"
              className="d-inline-block align-top me-2"
              alt="Logo"
            />
            Siddhant Bus
          </Navbar.Brand>

          {/* Collapsible Nav for smaller screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left-side Nav */}
            <Nav className="me-auto" style={{ fontSize: '1.2rem' }}>
            <Nav.Link as={Link} to="/homepage">Home</Nav.Link>
              <Nav.Link href="#features">About Us</Nav.Link>
              <Nav.Link href="#pricing">Contact Us</Nav.Link>
            </Nav>

            {/* Right-side Nav */}
            <Nav style={{ fontSize: '1.2rem' }}>
              <Nav.Link href="#login" className="ms-auto fw-semibold">
                Login / Signup
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
