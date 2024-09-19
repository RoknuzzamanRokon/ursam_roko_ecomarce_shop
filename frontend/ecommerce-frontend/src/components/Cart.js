import React, { useEffect, useState } from "react";
import "./style/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (cart) => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalItemCount = cart.length;

    setTotalPrice(totalAmount.toFixed(2));
    setTotalProducts(totalCount);
    setTotalItems(totalItemCount);
  };

  const handleRemove = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1); // Remove the item from the cart
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Update localStorage
    calculateTotal(newCart); // Recalculate totals after removing the item
  };

  const handleProceedToPayment = () => {
    alert("Proceeding to payment...");
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h1>Your Shopping Cart</h1>

        {/* Add a row for the headers */}
        <div className="cart-header">
          <span className="cart-header-name"></span>
          <span className="cart-header-name">Product Name</span>
          <span className="cart-header-price">Price</span>
          <span className="cart-header-quantity">Quantity</span>
          <span className="cart-header-subtotal">Subtotal</span>
          <span className="cart-header-remove">Remove</span>
        </div>

        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">${item.price}</span>
            <span className="cart-item-quantity">x{item.quantity}</span>
            <span className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              className="cart-item-remove"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {totalItems}</p> {/* Display total items */}
        <p>Total Products: {totalProducts}</p>
        <p>Total Price: ${totalPrice}</p>
        <button onClick={handleProceedToPayment} className="payment-button">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
