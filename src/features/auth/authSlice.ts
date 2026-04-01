import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IFormLogin {
  email: string;
  password: string;
}

interface AuthState {
  user: IFormLogin;
}

const initialState: AuthState = {
  user: {
    email: "",
    password: "",
  },
};

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
  },
});

export const { setField, resetForm } = authSlice.actions;
export default authSlice.reducer;
