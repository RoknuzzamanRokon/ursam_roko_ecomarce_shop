import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./style/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(false); // State for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on new submission
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        setSuccess(true);
        alert("User registered successfully");
        // Optionally redirect to login page
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration");
    }
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="p-4 border rounded bg-light shadow">
          <h2 className="register-title text-center">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">User registered successfully!</Alert>}
          <Form onSubmit={handleSubmit} className="register-form">
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email (optional):</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (optional)"
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button type="submit" className="w-100 register-button">
              Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            I already have an account. Go <Link to="/login">Login</Link> page.
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
