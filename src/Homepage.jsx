import React, { useState } from "react";
import "./App.css";
import Slider from "./components/slider";
import ProductList from "./components/Productlist";
import CategoryList from "./components//CategoryList";

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="font-cabin">
      <Slider />
      <CategoryList onCategorySelect={setSelectedCategory} />
      <ProductList category={selectedCategory} />
    </div>
  );
}

export default Homepage;
