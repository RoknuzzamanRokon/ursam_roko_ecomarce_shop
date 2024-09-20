// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import HomePage from "./page/HomePage";
import ProductDetail from "./page/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Register from "./page/Register";
import Login from "./page/Login";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Header Component */}
        <Navbar /> {/* Navbar Component */}
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<ProductList />} />
          <Route path="/" element={<HomePage />} />

          {/* Categories */}
          <Route path="/breaded" element={<ProductList category="Breaded" />} />
          <Route
            path="/squid-octopus"
            element={<ProductList category="Squid & Octopus" />}
          />
          <Route
            path="/frozen-fishes"
            element={<ProductList category="Frozen Fishes" />}
          />
          <Route
            path="/shrimps-lobsters"
            element={<ProductList category="Shrimps & Lobsters" />}
          />
          <Route
            path="/shell-fishes"
            element={<ProductList category="Shell Fishes" />}
          />
          <Route
            path="/fillets-portions"
            element={<ProductList category="Fillets & Portions" />}
          />
          <Route
            path="/asian-mart"
            element={<ProductList category="Asian Mart" />}
          />

          {/* Product Detail */}
          <Route path="/product/:id/" element={<ProductDetail />} />

          {/* Cart */}
          <Route path="/cart/" element={<Cart />} />

          {/* Checkout - Protected Route */}
          <Route
            path="/checkout/"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          {/* User Authentication */}
          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer /> {/* Footer Component */}
      </Router>
    </AuthProvider>
  );
}

export default App;
