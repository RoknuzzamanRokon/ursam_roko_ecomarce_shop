import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Carousel, ListGroup, Button } from "react-bootstrap";
import "./style/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch products
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data);
    });

    // Uncomment to fetch categories if your API supports this
    // axios.get("http://localhost:8000/api/categories").then((res) => {
    //   setCategories(res.data);
    // });
  }, []);

  return (
    <Container className="mt-0"> {/* Set margin-top to 0 to remove padding from navbar */}
      <Row className="mb-0"> {/* Remove bottom margin from the row */}
        <Col md={4} className="p-0"> {/* Optional: Remove padding from the column */}
          <h2>Categories</h2>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item key={category.id}>
                <Link to={`/category/${category.id}`}>{category.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Slideshow - 70% on the right */}
        <Col md={8} className="mb-4 p-0"> {/* Optional: Remove padding from the column */}
          <Carousel>
            {products.slice(0, 5).map((product) => (
              <Carousel.Item key={product.id}>
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Product Section */}
      <h1 className="text-center mt-5">All Products</h1>

      <Row className="card-container">
        {products.map((product) => (
          <Col md={3} sm={6} xs={12} key={product.id} className="mb-3">
            <Card className="product-card">
              <Link to={`/product/${product.id}/`}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title className="custom-title">{product.name}</Card.Title>
                  <Card.Text className="custom-text">${product.price}</Card.Text>
                  <Button variant="dark">View Details</Button> {/* Black primary button */}
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
