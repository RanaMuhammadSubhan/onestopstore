// src/hooks/useCategories.js
import useSWR from "swr";
import { getCategories } from "../services/ClientServices";

const fetcher = async () => {
  const categories = await getCategories();
  return categories;
};

export const useCategories = () => {
  const { data, error } = useSWR("categories", fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};
