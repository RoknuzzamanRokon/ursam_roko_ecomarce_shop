// components/Footer.js
import React from "react";
import "./Footer.css"; // Optionally, you can add custom CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Yamama. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
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
