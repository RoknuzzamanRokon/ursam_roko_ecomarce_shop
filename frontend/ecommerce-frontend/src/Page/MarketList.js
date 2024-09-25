import React, { useState, useEffect } from 'react';
import './style/MarketList.css';

function MarketList() {
  const [lastPayment, setLastPayment] = useState(null);
  const [allPayments, setAllPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const marketLists = JSON.parse(localStorage.getItem('marketLists')) || [];
    if (marketLists.length > 0) {
      setLastPayment(marketLists[marketLists.length - 1]);
      setAllPayments(marketLists);
    }
  }, []);

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const handleRemovePayment = (index) => {
    const updatedPayments = allPayments.filter((_, i) => i !== index);
    setAllPayments(updatedPayments);
    localStorage.setItem('marketLists', JSON.stringify(updatedPayments));
  };

  return (
    <div className="market-list-container">
      <h1>Market List</h1>

      {lastPayment && (
        <div className="last-payment">
          <h2>Last Payment</h2>
          <p>Date: {new Date(lastPayment.date).toLocaleDateString()}</p>
          <p>Total Amount: ${lastPayment.total_amount.toFixed(2)}</p>
          <p>Total Quantity: {lastPayment.total_items}</p>
          <p>Total Items: {lastPayment.items.length}</p>
          <ul>
            {lastPayment.items.map((item, index) => (
              <li key={index}>
                {index + 1}. Product Name: {item.product_name} -------------- Quantity: {item.quantity} -------- Price: ${(
                  item.quantity * item.price
                ).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="all-payments">
        <h2>All Payments</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Total Items</th>
              <th>Action</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, index) => (
              <tr key={index}>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>${payment.total_amount.toFixed(2)}</td>
                <td>{payment.total_items}</td>
                <td>
                  <button
                    className="view-details-button"
                    onClick={() => handleViewDetails(payment)}
                  >
                    View Details
                  </button>
                </td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemovePayment(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPayment && (
        <div className="payment-details">
          <div className="overlay" onClick={() => setSelectedPayment(null)}></div>
          <div className="details-content">
            <h2>Payment Details</h2>
            <p>Date: {new Date(selectedPayment.date).toLocaleDateString()}</p>
            <p>Total Amount: ${selectedPayment.total_amount.toFixed(2)}</p>
            <p>Total Quantity: {selectedPayment.total_items}</p>
            <h3>Items:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedPayment.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="close-button"
              onClick={() => setSelectedPayment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketList;
