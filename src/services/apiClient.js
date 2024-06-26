import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  const response = await apiClient.get("/products");

  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get("/products/categories");
  console.log(response);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

// export const getProductById = async (id) => {
//   const response = await apiClient
//     .get(`/products/${id}`)
//     .then((res) => res.json())
//     .then((json) => console.log(json));
//   return response.data;
// };
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
