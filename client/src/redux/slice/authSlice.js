import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  isLoading: false,
  error: null,
  user: parsedUser,
  accessToken: localStorage.getItem("accessToken") || null,
};

export const createAccount = createAsyncThunk("/users/signup", async (data) => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    const responseData = response.data;
    toast.success(responseData.message);
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/login", loginData);
      const responseData = response.data.data;
      console.log(responseData);
      localStorage.setItem("user", JSON.stringify(responseData.loggedInUser));
      localStorage.setItem("accessToken", responseData.accessToken);
      localStorage.setItem("isLoggedIn", true);

      toast.success("Logged in successfully");

      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.clear();
      return true;
    } catch (error) {
      toast.error("Failed to logout");
      return false;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/me");
      const responseData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      return responseData;
    } catch (error) {
      toast.error("Failed to get current user data");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (forgotPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/forgot-password", forgotPasswordData);
      const responseData = response.data.data;
      toast.success("Password reset link sent successfully!");
      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/reset-password/${resetPasswordData.resetPasswordToken}`, resetPasswordData);
      const responseData = response.data.data;
      toast.success("Reset Password successfully!");
      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.loggedInUser;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export default authSlice.reducer;