import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./style/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center">Products</h1>
      <Row className="mt-4">
        {products.map((product) => (
          <Col md={4} lg={3} sm={6} xs={12} key={product.id} className="mb-4">
            <Card className="h-100">
              <Link to={`/product/${product.id}/`} className="product-link">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
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
