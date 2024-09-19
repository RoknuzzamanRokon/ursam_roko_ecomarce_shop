import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style/Header.css";

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

  const goToCart = () => {
    navigate("/cart"); // Redirect to the shopping cart page
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="path-to-your-logo.jpg" alt="Company Logo" />
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
        <a href="https://checksmyportfolio.com/">Contact Me</a>
        <Link to="/recent-viewed">Recent Viewed</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <div className="cart-info" onClick={goToCart}>
        <span>Shopping Cart</span>
        <span className="cart-count">0</span>
        <span>0.000 tk</span>
      </div>
    </header>
  );
}

export default Header;
