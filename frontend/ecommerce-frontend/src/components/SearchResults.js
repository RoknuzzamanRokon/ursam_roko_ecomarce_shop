import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return; // Early return if no query is specified

      setLoading(true);
      setError(""); // Reset error state before new request

      try {
        const response = await fetch(
          `http://localhost:8000/api/products/search?query=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`); // Throw error for non-2xx HTTP status
        }
        const data = await response.json();
        setProducts(data); // Assuming the API returns an array of products
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch results. Please try again."); // Set error message for the user
      } finally {
        setLoading(false); // Ensure loading is set to false after the fetch
      }
    };

    fetchProducts();
  }, [query]);

  // Display loading state
  if (loading) return <div>Loading...</div>;

  // Display error state
  if (error) return <div>Error: {error}</div>;

  // Display results or no results message
  return (
    <div>
      <h1>Search Results for: "{query}"</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100px", height: "100px" }}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No results found for "{query}".</div>
      )}
    </div>
  );
}

export default SearchResults;
