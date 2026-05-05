import { Axios } from "../constant/MainContent";


export const getProductsApi = async (params) => {
  try {
    const res = await Axios.get("/products", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByIdApi = async (id) => {
  const res = await Axios.get(`/products/${id}`);
  return res.data;
};