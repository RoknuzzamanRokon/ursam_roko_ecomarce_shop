import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage quantity

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = { ...product, quantity };
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = product ? (product.price * quantity).toFixed(2) : 0; // Calculate total price

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-card-2">
      <div className="product-image-2">
        <button onClick={handleBack} className="back-button">
          &larr; Back
        </button>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details-2">
        <h1>{product.name}</h1>
        <p>Description: {product.description}</p>
        <p>Price per unit: ${product.price}</p>
        <div className="quantity-selector">
          <p>Select Quantity: -----> </p>
          <button className="quantity-button" onClick={decrement}>
            -
          </button>
          <input
            className="quantity-input"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            min="1"
          />
          <button className="quantity-button" onClick={increment}>
            +
          </button>
        </div>
        <p className="total-price">Total Price: ${totalPrice}</p>{" "}
        {/* Display total price */}
        <button onClick={addToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
