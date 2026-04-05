import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartSlice from "@/features/cartSlice";
import globalSlice from "@/features/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    cart: cartSlice,
    auth: authReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

