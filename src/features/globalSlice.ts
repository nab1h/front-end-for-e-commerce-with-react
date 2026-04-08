import type { IUploadedFile } from "@/components/dashboard/UploadPhotoAdd";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isCartOpen: boolean;
  isAddProductOpen: boolean;
  whyIsSelected: string;
  files: IUploadedFile[];
}

const initialState: GlobalState = {
  isCartOpen: false,
  isAddProductOpen: false,
  whyIsSelected: "",
  files: [],
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
    // ───────────── Add Product Dialog ─────────────
    openAddProduct: (state) => {
      state.isAddProductOpen = true;
    },
    closeAddProduct: (state) => {
      state.isAddProductOpen = false;
    },
    // ───────────── Add Select Category Product Dialog ─────────────
    selectedAdd: (state, action: PayloadAction<string>) => {
      state.whyIsSelected = action.payload;
    },
    // ───────────── Add Select images Product Dialog ─────────────
    setFiles: (state, action: PayloadAction<IUploadedFile[]>) => {
      state.files = action.payload;
    },
    addFiles: (state, action: PayloadAction<IUploadedFile[]>) => {
      state.files = [...state.files, ...action.payload];
    },
    clearFiles: (state) => {
      state.files = [];
    },
    // ───────────── Edit Product Dialog ─────────────

    // ───────────── edit Select Category Product Dialog ─────────────
  },
});

export const {
  toggleCart,
  openCart,
  closeCart,
  openAddProduct,
  closeAddProduct,
  selectedAdd,
  addFiles,
  setFiles,
  clearFiles,
} = globalSlice.actions;
export default globalSlice.reducer;
