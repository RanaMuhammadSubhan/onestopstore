// src/components/ProductDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import useProductbyid from "../hooks/useProductsdetails";
import { addItemToCart } from "../services/cartservices";


const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading, isError } = useProductbyid(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product.</div>;
  const handleAddToCart = () => {
    addItemToCart(product);
  };
  return (
    <div className="container mx-auto px-52 py-12 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.title} className="w-80 h-72" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <button
              className="flex px-4 py-2 bg-purple-600 text-white rounded-2xl"
              onClick={handleAddToCart}
            >
              Add to Carts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="ml-2 size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
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
