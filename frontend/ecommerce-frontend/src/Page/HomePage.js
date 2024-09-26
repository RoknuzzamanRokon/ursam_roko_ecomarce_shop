import React, { useEffect, useState } from "react";
import CategoriesPage from "./Categories"; 
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./style/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Container fluid className="p-10">
      <CategoriesPage />
      <h1 className="text-center mt-5">All Products</h1>

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={2} className="mb-4"> 
            <Card className="h-100">
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2" style={{ fontSize: '16px' }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text className="mb-2">
                    Price: ${product.price}
                  </Card.Text>
                  <Button variant="dark" className="mt-auto">View Details</Button>
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
