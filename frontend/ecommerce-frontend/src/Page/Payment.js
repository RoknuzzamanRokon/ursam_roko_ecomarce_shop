import React, { useState } from "react";
import "./style/Payment.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  // const handlePaymentSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request

  //     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  //     const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //     const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  //     const response = await axios.post('http://localhost:8000/api/market-lists/', {
  //       total_amount: totalAmount,
  //       total_items: totalItems,
  //       items: cartItems.map(item => ({
  //         product: item.id,
  //         quantity: item.quantity,
  //         price: item.price
  //       }))
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null}`
  //       }
  //     });

  //     if (response.status === 201) {
  //       setPaymentSuccess(true);
  //       localStorage.removeItem('cart'); // Clear the cart
  //       setTimeout(() => {
  //         navigate("/market-list"); // Redirect to the market list page
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     alert("Payment failed, please try again.");
  //   }
  // };


  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
      // Create a new market list entry
      const newMarketList = {
        date: new Date().toISOString(),
        total_amount: parseFloat(totalAmount.toFixed(2)),
        total_items: totalItems,
        items: cartItems.map(item => ({
          product_name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price)
        }))
      };
  
      // Get existing market lists or initialize an empty array
      const existingMarketLists = JSON.parse(localStorage.getItem('marketLists')) || [];
  
      // Add the new market list to the existing ones
      existingMarketLists.push(newMarketList);
  
      // Save the updated market lists back to localStorage
      localStorage.setItem('marketLists', JSON.stringify(existingMarketLists));
  
      setPaymentSuccess(true);
      localStorage.removeItem('cart'); // Clear the cart
      localStorage.setItem('paymentSuccessful', 'true'); // Set flag for successful payment
  
      setTimeout(() => {
        navigate("/market-list"); // Redirect to the market list page
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed, please try again.");
    }
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
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
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
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
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
