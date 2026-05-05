import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddressApi,
  getAddressesApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "../../API/address-api";

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAddressesApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await addAddressApi(addressData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const response = await updateAddressApi(id, addressData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteAddressApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await setDefaultAddressApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAddressStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex((addr) => addr._id === action.payload._id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((addr) => addr._id !== action.payload);
      })
      // Set Default Address
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses.forEach((addr) => {
          addr.isDefault = addr._id === action.payload;
        });
      });
  },
});

export const { resetAddressStatus } = addressSlice.actions;
export default addressSlice.reducer;
