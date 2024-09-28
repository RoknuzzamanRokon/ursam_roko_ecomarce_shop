import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style/Categories.css";  // Make sure to create this file for custom styles

function CategoriesPage() {
  const [products, setProducts] = useState([]);

  // Static category list based on your provided image
  const categories = [
    { id: 1, name: "Kachabajar", icon: "/images/kachabajar-icon.png" }, // add real image path
    { id: 2, name: "Home Care", icon: "/images/home-care-icon.png" },
    { id: 3, name: "Frozen Foods", icon: "/images/frozen-foods-icon.png" },
    { id: 4, name: "Dairy", icon: "/images/dairy-icon.png" },
    { id: 5, name: "Fruits", icon: "/images/fruits-icon.png" },
    { id: 6, name: "Snacks", icon: "/images/snacks-icon.png" },
    { id: 7, name: "Tea & Coffee", icon: "/images/tea-coffee-icon.png" },
    { id: 8, name: "Personal Care", icon: "/images/personal-care-icon.png" },
    { id: 9, name: "Sauce & Pickles", icon: "/images/sauce-pickles-icon.png" },
  ];

  useEffect(() => {
    // Fetch products
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Container fluid className="p-10">
      <Row className="mb-0">
        <Col md={4} className="p-0 categories-sidebar">
          <h2>Categories</h2>
          <ListGroup className="category-list">
            {categories.map((category) => (
              <ListGroup.Item key={category.id} className="d-flex align-items-center">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="category-icon me-2"  // Add this CSS class to style the icons
                />
                <Link to={`/category/${category.id}`} className="category-link">
                  {category.name}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Products Carousel */}
        <Col md={8} className="category-image-slider mb-4 p-0">
          <Carousel>
            {products.slice(0, 15).map((product) => (
              <Carousel.Item key={product.id}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img
                    className="d-block w-100"
                    src={product.image}
                    alt={product.name}
                    style={{ height: "300px" }}
                  />
                  <Carousel.Caption>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoriesPage;
