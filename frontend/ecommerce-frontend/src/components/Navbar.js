// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
// import './style/Navbar.css';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <BootstrapNavbar bg="light" expand="lg" expanded={isMenuOpen} className="navbar p-0">
//       <Container className="p-10">
//         <Link className="navbar-brand" to="/">
//           <img src="/assets/images/01.png" alt="Homepage" className="navbar-logo" />
//           Homepage
//         </Link>
//         <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
//           ☰
//         </BootstrapNavbar.Toggle>
//         <BootstrapNavbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto navbar-links">
//             <Nav.Link as={Link} to="/category/squid-octopus">
//               Squid & Octopus
//             </Nav.Link>
//             <Nav.Link as={Link} to="/category/frozen-fishes">
//               Frozen Fishes
//             </Nav.Link>
//             <Nav.Link as={Link} to="/category/shrimps-lobsters">
//               Shrimps & Lobsters
//             </Nav.Link>
//             <Nav.Link as={Link} to="/category/shell-fishes">
//               Shell Fishes
//             </Nav.Link>
//             <Nav.Link as={Link} to="/category/fillets-portions">
//               Fillets & Portions
//             </Nav.Link>
//             <Nav.Link as={Link} to="/category/asian-mart">
//               Asian Mart
//             </Nav.Link>
//           </Nav>
//         </BootstrapNavbar.Collapse>
//       </Container>
//     </BootstrapNavbar>
//   );
// }

// export default Navbar;
