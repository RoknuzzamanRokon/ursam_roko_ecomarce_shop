import React from "react";
import "./style/Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="footer-content">
        <p>© 2024 Rokunuzzaman. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="https://checksmyportfolio.com/">Contact Me</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
