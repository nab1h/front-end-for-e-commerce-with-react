import type { RootState } from "@/app/store";
import type { ICartProduct } from "@/interfaces/interfaces";
import { addItemShoppingToCart } from "@/utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export interface CartState {
  cartProducts: ICartProduct[];
}
const initialState: CartState = {
    cartProducts : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      state.cartProducts = addItemShoppingToCart(
        action.payload,
        state.cartProducts,
      );
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) product.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) product.quantity -= 1;
      return;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
        state.cartProducts = state.cartProducts.filter(
          (p) => p.id !== action.payload,
        );
    },
    clearAllProducts: (state)=>{
      state.cartProducts = [];
    }
  },
});
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearAllProducts,
} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;