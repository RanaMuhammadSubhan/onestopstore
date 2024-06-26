import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ProductDetails from "./components/Productdetails";
import ProductList from "./components/Productlist";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/products" element={<ProductList />} /> */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/checkout" component={Checkout} /> */}
          {/* <Route path="/cart" component={Cart} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
