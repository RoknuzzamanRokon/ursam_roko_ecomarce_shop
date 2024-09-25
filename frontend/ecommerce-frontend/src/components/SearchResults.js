import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

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
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  // Display error state
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center mt-4">Search Results for: "{query}"</h1>
      {products.length > 0 ? (
        <Row className="mt-4">
          {products.map((product) => (
            <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
              {/* Wrap the card with Link to navigate to product details */}
              <Link to={`/product/${product.id}`} className="product-link">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="warning" className="text-center mt-4">
          No results found for "{query}".
        </Alert>
      )}
    </Container>
  );
}

export default SearchResults;
