import type { RootState } from "@/app/store";
import type { ICartProduct } from "@/interfaces/interfaces";
import { addItemShoppingToCart } from "@/utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export interface CartState {
  cartProducts: ICartProduct[];
}
const getInitialCart = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const initialState: CartState = {
  cartProducts: getInitialCart(),
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
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product) product.quantity += 1;

      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cartProducts.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) product.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
      return;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
        state.cartProducts = state.cartProducts.filter(
          (p) => p.id !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    clearAllProducts: (state)=>{
      state.cartProducts = [];
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
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