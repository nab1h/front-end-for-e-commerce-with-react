import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "../../api/axios";
import {  } from "@/api/axios";
interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

interface AuthState {
  user: IFormLogin;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
const token = localStorage.getItem("token");
const initialState: AuthState = {
  user: {
    email: "",
    password: "",
  },
  isLoading: false,
  error: null,
  isAuthenticated: !!token,
};

// Async login action
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: IFormLogin) => {
    const response = await login(credentials);
    return response.data;
  }
);

// Async register action
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: IFormRegister) => {
    const response = await register({
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation || userData.password,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ name: string; value: string }>,
    ) => {
      state.user[action.payload.name as keyof IFormLogin] =
        action.payload.value;
    },

    resetForm: (state) => {
      state.user = { email: "", password: "" };
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { email: "", password: "" };

      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;

        const token = action.payload.token;
        localStorage.setItem("token", token);
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const token = action.payload.token;
        if (token) {
          localStorage.setItem("token", token);
          state.isAuthenticated = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export const { setField, resetForm, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
