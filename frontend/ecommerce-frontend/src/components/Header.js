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
        <img src="/assets/images/ursamRokoLogo.png" alt="UrsamRokoLogo" />
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
        {user && <Link to="/market-list">Market List</Link>}

        {user ? (
          <>
            <span className="user-name">
              Welcome, {user?.username || user?.name || user?.email || "User"}
            </span>

            <span className="logout-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
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
