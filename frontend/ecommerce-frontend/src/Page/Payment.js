import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style/Payment.css";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Create a new market list entry
      const newMarketList = {
        date: new Date().toISOString(),
        total_amount: parseFloat(totalAmount.toFixed(2)),
        total_items: totalItems,
        items: cartItems.map((item) => ({
          product_name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
      };

      // Get existing market lists or initialize an empty array
      const existingMarketLists =
        JSON.parse(localStorage.getItem("marketLists")) || [];

      // Add the new market list to the existing ones
      existingMarketLists.push(newMarketList);

      // Save the updated market lists back to localStorage
      localStorage.setItem("marketLists", JSON.stringify(existingMarketLists));

      setPaymentSuccess(true);
      localStorage.removeItem("cart"); // Clear the cart
      localStorage.setItem("paymentSuccessful", "true"); // Set flag for successful payment

      setTimeout(() => {
        navigate("/market-list"); // Redirect to the market list page
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <div className="payment-container">
            <h1 className="payment-title">Secure Payment</h1>
            <Form onSubmit={handlePaymentSubmit} className="payment-form">
              <Form.Group controlId="cardNumber" className="mb-1">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                  maxLength="16"
                />
              </Form.Group>

              <Row>
                <Col xs={6}>
                  <Form.Group controlId="expiryDate" className="mb-1">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group controlId="cvv" className="mb-1">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="XXX"
                      required
                      maxLength="1"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="nameOnCard" className="mb-1">
                <Form.Label>Name on Card</Form.Label>
                <Form.Control
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </Form.Group>

              <Form.Group controlId="billingAddress" className="mb-1">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="1234 Main St, Apt 4B, City, Country"
                  required
                />
              </Form.Group>

              <Button type="submit" className="payment-button w-100">
                Confirm Payment
              </Button>
            </Form>

            {paymentSuccess && (
              <Alert variant="success" className="mt-1">
                Payment Successful!
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;