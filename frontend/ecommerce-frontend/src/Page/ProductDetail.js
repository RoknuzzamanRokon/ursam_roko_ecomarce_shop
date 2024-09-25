import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Image, Form, InputGroup } from "react-bootstrap";
import "./style/ProductDetail.css";
import Toast from "../components/Toast";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = { ...product, quantity };
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    setToastMessage("Product added to cart");
    setShowToast(true);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = product ? (product.price * quantity).toFixed(2) : 0; // Calculate total price

  if (!product) return <div>Loading...</div>;

  return (
    <Container className="product-detail">
      <Button variant="secondary" onClick={handleBack} className="mb-4">
        &larr; Back
      </Button>
      <Row>
        <Col md={6} className="product-image-2">
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6} className="product-details-2">
          <h1>{product.name}</h1>
          <p>Description: {product.description}</p>
          <p>Price per unit: ${product.price}</p>
          
          <Form.Group className="quantity-selector">
            <Form.Label>Select Quantity:</Form.Label>
            <InputGroup className="quantity-input-group">
              <Button variant="outline-secondary" onClick={decrement}>
                -
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                min="1"
                className="quantity-input"
              />
              <Button variant="outline-secondary" onClick={increment}>
                +
              </Button>
            </InputGroup>
          </Form.Group>
          
          <p className="total-price">Total Price: ${totalPrice}</p>
          
          <Button onClick={addToCart} className="add-to-cart-button" variant="primary">
            Add to Cart
          </Button>

          {showToast && (
            <Toast message={toastMessage} onDismiss={() => setShowToast(false)} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
