import React, { useState, useContext } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Container,
  Badge,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaBars } from 'react-icons/fa'; // Import FaBars from react-icons/fa
import './style/Header.css';

function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchTerm}`);
    setExpanded(false);
  };

  const goToCart = () => {
    navigate('/cart');
    setExpanded(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setExpanded(false);
  };

  return (
    <Navbar bg="light" expand="lg" expanded={expanded} className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/images/ursamRokoLogo.png"
            alt="UrsamRokoLogo"
            className="logo-image"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex me-auto" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search in 1000+ products..."
              className="me-2 search-bar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/recent-viewed" onClick={() => setExpanded(false)}>
              Recent Viewed
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/market-list" onClick={() => setExpanded(false)}>
                Market List
              </Nav.Link>
            )}
            {user ? (
              <NavDropdown
                title={`Welcome, ${
                  user?.username || user?.name || user?.email || 'User'
                }`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)}>
                  Login
                </Nav.Link>
              </>
            )}
            <Nav.Link onClick={goToCart} className="cart-info">
              Shopping Cart <Badge bg="secondary">0</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
