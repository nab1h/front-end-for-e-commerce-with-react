import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isCartOpen: boolean;
}

const initialState: GlobalState = {
  isCartOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { toggleCart, openCart, closeCart } = globalSlice.actions;
export default globalSlice.reducer;
