import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import "./style/Header.css";

function Header() {
  const { user, logoutUser } = useContext(AuthContext); // Get user and logoutUser from AuthContext
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchTerm}`); 
  };

  const goToCart = () => {
    navigate("/cart"); 
  };

  const handleLogout = () => {
    logoutUser(); 
    navigate("/"); 
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
        <Link to="/recent-viewed">Recent Viewed</Link>

        {user ? (
          <>
            {/* Show user name and Logout link if logged in */}
            <span className="user-name">
              Welcome, {user?.username || user?.name || user?.email || "User"}
            </span>
            
            <span className="logout-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          // Show Login and Register links if not logged in
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
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
