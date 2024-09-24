import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    consolidateCartItems(cart);
  });

  const consolidateCartItems = (cart) => {
    const consolidatedItems = cart.reduce((acc, item) => {
      const found = acc.find((x) => x.id === item.id);
      if (found) {
        found.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    setCartItems(consolidatedItems);
    calculateTotal(consolidatedItems);
  };

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

  const handleRemove = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  const adjustItemQuantity = (id, delta) => {
    const newCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(0, newQuantity) }; // Prevent negative quantities
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove items with 0 quantity
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  const handleProceedToPayment = () => {
    const authTokens = localStorage.getItem("authTokens");
    if (!authTokens) {
      navigate("/login");
    } else {
      navigate("/payment");
    }
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h1>Your Shopping Cart</h1>
        <div className="cart-header">
          <span className="header-item">Product Name</span>
          <span className="header-item">Price</span>
          <span className="header-item">Quantity</span>
          <span className="header-item">Subtotal</span>
          <span className="header-item">Control</span>
        </div>
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">${item.price}</span>
            <div className="cart-item-quantity">
              <button onClick={() => adjustItemQuantity(item.id, -1)}>-</button>
              <span>{item.quantity.toString().padStart(2, "0")}</span>
              <button onClick={() => adjustItemQuantity(item.id, 1)}>+</button>
            </div>
            <span className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              className="cart-item-remove"
              onClick={() => handleRemove(item.id)}
            >
              Remove All
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Products: {totalItems}</p>
        <p>Total Items: {totalProducts}</p>
        <p>Total Price: ${totalPrice}</p>
        <button onClick={handleProceedToPayment} className="payment-button">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
