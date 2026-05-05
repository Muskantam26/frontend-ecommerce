import {Axios} from "../constant/MainContent";

// Add to cart
export const addToCartApi = async (data) => {
  const res = await Axios.post("/cart/add", data);
  return res.data;
};

// Get cart
export const getCartApi = async () => {
  const res = await Axios.get("/cart");
  return res.data;
};

// Update cart item
export const updateCartApi = async (data) => {
  const res = await Axios.put("/cart/update", data);
  return res.data;
};

// Remove cart item
export const removeCartApi = async (data) => {
  const res = await Axios.delete("/cart/remove", { data });
  return res.data;
};

// Clear cart
export const clearCartApi = async () => {
  const res = await Axios.delete("/cart/clear");
  return res.data;
};