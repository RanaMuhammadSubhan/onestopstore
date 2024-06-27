import useSWR from "swr";
import { getProducts } from "../services/ClientServices";

const fetcher = async () => {
  const products = await getProducts();
  return products;
};

export const useProducts = () => {
  const { data, error } = useSWR("products", fetcher);
  console.log(data);
  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};
