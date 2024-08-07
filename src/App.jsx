import React, { useEffect } from "react";
import useSearchStore from "./Store/useSearchStore";
import { getProducts } from "./services/ClientServices";
import useSWR from "swr"; // Import useSWR for data fetching
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductDetails from "./components/Productdetails";
import ProductList from "./components/Productlist";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Signup from "./components/Signup";
import Login from "./components/Login"
import Profile from "./components/Profile";
function App() {
  const setProducts = useSearchStore((state) => state.setProducts);

  const { data, error } = useSWR("/products", getProducts);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts]);

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/checkout" component={Checkout} /> */}
          {/* <Route path="/cart" component={Cart} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
