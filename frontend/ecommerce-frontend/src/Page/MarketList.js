import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/MarketList.css';

function MarketList() {
  const [lastPayment, setLastPayment] = useState(null);
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    // Fetch last payment and all payments data
    const fetchPayments = async () => {
      try {
        const lastPaymentResponse = await axios.get('http://localhost:8000/api/payments/last/');
        const allPaymentsResponse = await axios.get('http://localhost:8000/api/payments/');
        
        setLastPayment(lastPaymentResponse.data);
        setAllPayments(allPaymentsResponse.data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="market-list-container">
      <h1>Market List</h1>
      
      {lastPayment && (
        <div className="last-payment">
          <h2>Last Payment</h2>
          <p>Date: {new Date(lastPayment.date).toLocaleDateString()}</p>
          <p>Total Amount: ${lastPayment.total_amount.toFixed(2)}</p>
          <p>Total Items: {lastPayment.total_items}</p>
          <ul>
            {lastPayment.items.map((item, index) => (
              <li key={index}>{item.name} - Quantity: {item.quantity}</li>
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
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, index) => (
              <tr key={index}>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>${payment.total_amount.toFixed(2)}</td>
                <td>{payment.total_items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketList;