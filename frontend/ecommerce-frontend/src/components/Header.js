import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchTerm}`); // Redirect to search page with the query
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="path-to-your-logo.jpg" alt="Company Logo" />{" "}
        {/* Update the logo URL */}
      </div>
      <form onSubmit={handleSearchSubmit} className="search-bar-form">
        <input
          type="text"
          placeholder="Search in 1000+ products..."
          className="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <nav className="nav-links">
        <Link to="/contact">Contact Us</Link>{" "}
        {/* Using Link for SPA behavior */}
        <Link to="/recent-viewed">Recent Viewed</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <div className="cart-info">
        <span>Shopping Cart</span>
        <span className="cart-count">0</span>
        <span>د.ك 0.000</span>
      </div>
    </header>
  );
}

export default Header;
