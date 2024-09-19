import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="product-list">
      {products.length > 0 && (
        <div className="slideshow">
          <img
            src={products[currentSlide].image}
            alt={products[currentSlide].name}
            className="slideshow-image"
          />
        </div>
      )}
      <h1>All Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}/`}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
