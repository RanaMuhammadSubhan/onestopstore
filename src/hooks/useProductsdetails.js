// src/hooks/useProduct.js
import useSWR from "swr";
import { getProductById } from "../services/ClientServices";

const fetchProduct = async (id) => {
  console.log(id);
  const data = await getProductById(id);
  return data;
};

const useProduct = (id) => {
  const { data, error } = useSWR(`product-${id}`, () => fetchProduct(id)); // Pass the id parameter to the fetchProduct function
  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProduct;
