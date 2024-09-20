import React, { useState } from "react";
import "./style/Payment.css";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Add payment processing logic here
    // After successful payment, set payment success to true and redirect
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/confirmation"); // Redirect to a confirmation page or homepage
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Secure Payment</h1>
      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="XXXX XXXX XXXX XXXX"
            required
            maxLength="16"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="XXX"
              required
              maxLength="3"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nameOnCard">Name on Card</label>
          <input
            type="text"
            id="nameOnCard"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="1234 Main St, Apt 4B, City, Country"
            required
          />
        </div>

        <button type="submit" className="payment-button">
          Confirm Payment
        </button>
      </form>

      {paymentSuccess && (
        <div className="payment-success">Payment Successful!</div>
      )}
    </div>
  );
}

export default Payment;
