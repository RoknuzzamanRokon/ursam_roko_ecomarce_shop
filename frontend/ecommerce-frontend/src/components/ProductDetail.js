import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css"; // Make sure to import the CSS file

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-card">
      <button onClick={handleBack} className="back-button">
        Back
      </button>{" "}
      {/* Back button */}
      <h1>{product.name}</h1>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;
