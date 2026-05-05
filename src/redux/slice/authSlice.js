import { createSlice } from "@reduxjs/toolkit";
import { saveUser, getUser, removeUser } from "./authStorage";

const storedData = getUser();
const initialState = {
  user: storedData?.user || null,
  token: storedData?.token || null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginStart: (state) => {
      state.isLoading = true;
    },

    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveUser(action.payload);
    },

    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      removeUser();
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;