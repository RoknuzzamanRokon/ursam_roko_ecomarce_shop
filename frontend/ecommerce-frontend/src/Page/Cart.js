import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Image, Table, Form, InputGroup } from "react-bootstrap";
import "./style/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items from localStorage and calculate totals
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    consolidateCartItems(cart);
  }, []);

  // Consolidates duplicate cart items and updates state
  const consolidateCartItems = (cart) => {
    const consolidatedItems = cart.reduce((acc, item) => {
      const found = acc.find((x) => x.id === item.id);
      if (found) {
        found.quantity += item.quantity;
      } else {
        acc.push({
          ...item,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity, 10),
        });
      }
      return acc;
    }, []);

    setCartItems(consolidatedItems);
    calculateTotal(consolidatedItems);
  };

  // Calculates the total price, total items, and number of products
  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(totalAmount.toFixed(2));
    setTotalProducts(items.length);
    setTotalItems(totalCount);
  };

  // Adjusts the quantity of items in the cart and recalculates totals
  const adjustItemQuantity = (id, delta) => {
    const newCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQuantity) }; // Prevents negative or zero quantities
        }
        return item;
      });

    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  // Removes an item from the cart entirely
  const handleRemove = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  // Navigates to payment if the user is authenticated, else prompts login
  const handleProceedToPayment = () => {
    const authTokens = localStorage.getItem("authTokens");
    if (!authTokens) {
      navigate("/login");
    } else {
      navigate("/payment");
    }
  };

  if (cartItems.length === 0) {
    return <Container className="text-center mt-5">Your cart is empty</Container>;
  }

  return (
    <Container className="cart-container mt-5">
      <h1>Your Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <Table bordered hover responsive className="narrow-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Image src={item.image} alt={item.name} thumbnail className="cart-item-image" />
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <InputGroup className="quantity-input-group">
                      <Button
                        variant="outline-secondary"
                        onClick={() => adjustItemQuantity(item.id, -1)}
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          adjustItemQuantity(item.id, parseInt(e.target.value) - item.quantity)
                        }
                        min="1"
                        className="quantity-input"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => adjustItemQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove All
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>
              <strong>Total Products:</strong> {totalProducts}
            </p>
            <p>
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p>
              <strong>Total Price:</strong> ${totalPrice}
            </p>
            <Button
              onClick={handleProceedToPayment}
              className="payment-button"
              variant="success"
              block
            >
              Proceed to Payment
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
