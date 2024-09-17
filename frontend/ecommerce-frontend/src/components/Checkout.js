import React from "react";
// You'll integrate payment here

function Checkout() {
  const handlePayment = () => {
    // Payment processing logic
    alert("Payment processed successfully!");
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Payment gateway integration goes here.</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;
