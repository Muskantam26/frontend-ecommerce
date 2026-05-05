import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getWishlistApi, 
  addToWishlistApi, 
  removeFromWishlistApi 
} from "../../API/wishlist-api";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlistApi();
      return response.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await addToWishlistApi(productId);
      return response.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeFromWishlistApi(productId);
      return response.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add To Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.error = null;
      })
      // Remove Item
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.error = null;
      });
  },
});

export default wishlistSlice.reducer;
