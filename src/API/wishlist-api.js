import {Axios} from "../constant/MainContent";

// Add to wishlist
export const addToWishlistApi = async (productId) => {
  const res = await Axios.post("/wishlist/add", { productId });
  return res.data;
};

// Get wishlist
export const getWishlistApi = async () => {
  const res = await Axios.get("/wishlist");
  return res.data;
};

// Remove from wishlist
export const removeFromWishlistApi = async (productId) => {
  const res = await Axios.post("/wishlist/remove", { productId });
  return res.data;
};
