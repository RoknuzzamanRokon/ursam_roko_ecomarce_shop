import React from "react";
import "./style/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/">
        <img
          src="/assets/images/01.png"
          alt="Homepage"
          className="navbar-logo"
        />
        Homepage
      </a>
      <a href="#">Squid & Octopus</a>
      <a href="#">Frozen Fishes</a>
      <a href="#">Shrimps & Lobsters</a>
      <a href="#">Shell Fishes</a>
      <a href="#">Fillets & Portions</a>
      <a href="#">Asian Mart</a>
    </nav>
  );
}

export default Navbar;
