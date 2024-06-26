// src/components/ProductDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import useProductbyid from "../hooks/useProductsdetails";
import { addItemToCart } from '../services/cartservices';
const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading, isError } = useProductbyid(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product.</div>;
  const handleAddToCart = () => {
    addItemToCart(product);
  };
  return (
    <div className="container mx-auto px-4 py-12 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.title} className="w-80 h-72" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-2xl"  onClick={handleAddToCart}>
                Add to Cart
              </button>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Category:</span>
            <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
