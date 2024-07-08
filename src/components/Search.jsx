import React, { useState, useEffect } from "react";
import useSearchStore from "../Store/useSearchStore";
import { Link } from "react-router-dom";
const Search = ({ onClose }) => {
  const [input, setInput] = useState("");
  const { filteredProducts, setQuery } = useSearchStore((state) => ({
    filteredProducts: state.filteredProducts,
    setQuery: state.setQuery,
  }));

  useEffect(() => {
    setQuery(input);
  }, [input, setQuery]);

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       value={query}
  //       onChange={handleInputChange}
  //       placeholder="Search products..."
  //     />
  //     <div>
  //       {filteredProducts.slice(0, 5).map((product) => (
  //         <div key={product.id}>
  //           <h3 className="text-black font-semibold bg-white">{product.title}</h3>
  //           <p className="text-black bg-white">{product.description}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-2xl font-bold">Search Products</h2> */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-5xl font-bold w-full p-2 mb-4 text-center border-none"
          placeholder="Search  Products"
        />
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-right justify-end"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div>
        {filteredProducts.slice(0, 5).map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div
              key={product.id}
              className="flex items-center mb-4"
              onClick={onClose}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 mr-4"
              />
              <div>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-gray-600">
                  {product.description.substring(0, 100)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
