import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeFromCart = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const totalPrice = cart.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <Link to="/checkout/">
        <button disabled={cart.length === 0}>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;
