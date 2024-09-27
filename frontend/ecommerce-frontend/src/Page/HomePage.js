import React, { useEffect, useState } from "react";
import CategoriesPage from "./Categories";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./style/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]); // Track products added to cart

  useEffect(() => {
    // Fetch products
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = { ...product, quantity: 1 }; // Default quantity of 1 for HomePage
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Add the product ID to the addedProducts state
    setAddedProducts((prevAdded) => [...prevAdded, product.id]);

    // Auto-revert "CART ADD" back to "Add to Cart" after 3 seconds
    setTimeout(() => {
      setAddedProducts((prevAdded) => prevAdded.filter((id) => id !== product.id));
    }, 3000); // 3 seconds delay before reverting
  };

  return (
    <Container fluid className="p-10">
      <CategoriesPage />
      <h1 className="text-center mt-5">All Products</h1>

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={3} className="mb-4">
            <div className="card-container">
              <Card
                className="h-100"
                onClick={() => addToCart(product)} // Add to cart when clicking the card
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2" style={{ fontSize: "16px" }}>
                    {product.name}
                  </Card.Title>
                  <Card.Text className="mb-2">Price: ${product.price}</Card.Text>
                  <Button
                    variant="dark"
                    className="mt-auto view-details-button"
                    as={Link}
                    to={`/product/${product.id}`}
                    onClick={(e) => e.stopPropagation()} // Prevent card click event when clicking "View Details"
                  >
                    View Details
                  </Button>
                </Card.Body>
                {/* Conditionally render "Add to Cart" or "CART ADD" */}
                <div className="add-to-cart-overlay">
                  {addedProducts.includes(product.id) ? "CART ADD" : "Add to Cart"}
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
