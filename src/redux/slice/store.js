import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice"
import orderReducer from "./orderSlice";
import addressReducer from "./addressSlice"
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
    wishlist: wishlistReducer,
  }
});