import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./AuthContext";



import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Checkout from "./components/Checkout";
import SearchResults from "./components/SearchResults";
import HomePage from "./page/HomePage";
import ProductDetail from "./page/ProductDetail";
import Cart from "./page/Cart";
import Register from "./page/Register";
import Login from "./page/Login";
import Payment from "./page/Payment";
import MarketList from './page/MarketList';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Navbar /> 
          <Routes>

          <Route path="/" element={<ProductList />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id/" element={<ProductDetail />} />


          <Route path="/register/" element={<Register />} />
          <Route path="/login/" element={<Login />} />

          <Route path="/search" element={<SearchResults />} />

          <Route path="/cart/" element={<Cart />} />

          <Route
            path="/checkout/"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />


          <Route path="/payment" element={<Payment />} />


          <Route
            path="/market-list"
            element={<PrivateRoute>
              <MarketList/>
            </PrivateRoute>}
          />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
