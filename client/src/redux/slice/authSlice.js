import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  isLoading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
});

export default authSlice.reducer;