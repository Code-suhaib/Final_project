import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import MyNavbar from "../Components/MyNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function Contactus() {
  return (
    <>
      <MyNavbar />
      <Container className="my-5 px-3">
        <h2 className="text-center mb-4">Contact Us</h2>
        <Row>
          {/* Contact Form */}
          <Col md={6} className="mb-4">
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Type your message here..." />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>

          {/* Contact Details & Google Map */}
          <Col md={6}>
            <h5>Our Office</h5>
            <p>
              Siddhant College of Engineering<br />
              Chakan–Talegaon Road, Sudumbre<br />
              Near Chakan Auto Hub, Pune – 412109<br />
              Maharashtra, India
            </p>
            <p><strong>Phone:</strong> +91 99239 06993, +91 90219 77573</p>
            <p><strong>Email:</strong> scoeadmission@gmail.com</p>

            {/* Google Map Embed */}
            <div className="mt-3">
             <iframe
  title="Siddhant College of Engineering Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15111.477037390767!2d73.73807738968029!3d18.759376013378322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b40459c36e13%3A0xab2b1635d0a1deef!2sSiddhant%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1752860314379!5m2!1sen!2sin"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

            </div>
          </Col>
        </Row>
      </Container>

      <footer className="text-center py-4 bg-light">
        <p className="mb-0">© 2025 Siddhant Bus Tracker. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Contactus;
