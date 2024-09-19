import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="product-list">
      <h1>Products</h1>
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

export default HomePage;
