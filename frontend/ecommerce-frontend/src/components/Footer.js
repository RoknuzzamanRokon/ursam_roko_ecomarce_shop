import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style/Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="footer-logo">
            <img
              src="/assets/images/ursamRokoLogo.png"
              alt="Rokunuzzaman Logo"
              className="footer-logo-img"
            />
          </Col>
          <Col md={4} className="text-center">
            <p className="footer-text">© 2024 Rokunuzzaman. All rights reserved.</p>
          </Col>
          <Col md={4} className="footer-links text-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="/about">About Us</a>
              </li>
              <li className="list-inline-item">
                <a href="https://checksmyportfolio.com/">Contact Me</a>
              </li>
              <li className="list-inline-item">
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
