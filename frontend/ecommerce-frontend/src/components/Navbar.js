import React from "react";
import { Link } from "react-router-dom";
import "./style/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="homePageButton" to="/">
          <img
            src="/assets/images/01.png"
            alt="Homepage"
            className="navbar-logo"
          />
          Homepage
        </Link>
        <div className="navbar-links">
          <Link to="/category/squid-octopus">Squid & Octopus</Link>
          <Link to="/category/frozen-fishes">Frozen Fishes</Link>
          <Link to="/category/shrimps-lobsters">Shrimps & Lobsters</Link>
          <Link to="/category/shell-fishes">Shell Fishes</Link>
          <Link to="/category/fillets-portions">Fillets & Portions</Link>
          <Link to="/category/asian-mart">Asian Mart</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;