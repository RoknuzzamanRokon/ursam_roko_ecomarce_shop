// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Carousel, Card, Button, Row, Col, Container } from "react-bootstrap";
// import "./style/ProductList.css";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/products").then((res) => {
//       setProducts(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
//     }, 3000); // Change slide every 3 seconds
//     return () => clearInterval(interval);
//   }, [products]);

//   return (
//     <Container className="product-list">
//         {products.length > 0 && (
//           <Carousel activeIndex={currentSlide} onSelect={setCurrentSlide}>
//             {products.map((product, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   className="d-block w-100 slideshow-image"
//                   src={product.image}
//                   alt={product.name}
//                 />
//                 <Carousel.Caption>
//                   <h3>{product.name}</h3>
//                   <p>${product.price}</p>
//                 </Carousel.Caption>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         )}

//       <h1 className="text-center mt-5">All Products</h1>

//       <Row className="card-container">
//         {products.map((product) => (
//           <Col md={3} sm={6} xs={12} key={product.id} className="mb-3">
//             <Card className="product-card">
//               <Link to={`/product/${product.id}/`}>
//                 <Card.Img
//                   variant="top"
//                   src={product.image}
//                   alt={product.name}
//                   className="product-image"
//                 />
//                 <Card.Body>
//                   <Card.Title className="custom-title ">{product.name}</Card.Title>
//                   <Card.Text className="custom-text">${product.price}</Card.Text>
//                   <Button variant="dark">View Details</Button> {/* Black primary button */}
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// export default ProductList;
