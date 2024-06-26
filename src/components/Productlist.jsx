// import React from "react";
// import { useProducts } from "../hooks/useProducts";
// import { Link } from "react-router-dom";
// import ProductDetails from "../components/Productdetails";

// const ProductList = () => {
//   const { products, isLoading, isError } = useProducts();

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Failed to load products.</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">Popular Products</h2                                                                                                       >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <Link
//             key={product.id}
//             to={`/product/${product.id}`}
//             className="bg-white p-4 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-72 w-80 object-cover mb-4"
//             />
//             <h3 className="text-lg mb-2">{product.title}</h3>
//             <p className="text-black-500 font-semibold text-2xl mb-2">
//               ${product.price}
//             </p>
//             {/* <ProductDetails id={product.id} /> */}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
import React, { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../services/apiClient";
import { Link } from "react-router-dom";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = category
          ? await getProductsByCategory(category)
          : await getProducts();
        setProducts(fetchedProducts);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load products.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        {category ? `${category} Products` : "Popular Products"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white p-4 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 "
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-72 w-80 object-cover mb-4 rounded-2xl"
            />
            <h3 className="text-lg mb-2">{product.title}</h3>
            <p className="text-black-500 font-semibold text-2xl mb-2">
              ${product.price}
            </p>
            {/* <ProductDetails id={product.id} /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
