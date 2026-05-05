import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getCartApi, 
  addToCartApi, 
  updateCartApi, 
  removeCartApi, 
  clearCartApi 
} from "../../API/cart-api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartApi();
      return response.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addToCartApi(data);
      return response.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateCartApi(data);
      return response.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await removeCartApi(data);
      return response.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await clearCartApi();
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
    isOpen: false,
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add To Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      // Update Cart
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      // Remove Item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
        state.error = null;
      });
  },
});

export const { openCart, closeCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
