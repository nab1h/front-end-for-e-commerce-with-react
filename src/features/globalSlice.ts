
import type { IUploadedFile } from "@/components/dashboard/UploadPhotoAdd";
import type { IEditImage, InputValueEdit } from "@/interfaces/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isCartOpen: boolean;
  isAddProductOpen: boolean;
  isEditProductOpen: boolean;
  currentProduct: InputValueEdit | null;
  whyIsSelected: string;
  whyIsSelectedEdit: string;
  files: IUploadedFile[];
  editImages: IEditImage[];
}

const initialState: GlobalState = {
  isCartOpen: false,
  isAddProductOpen: false,
  isEditProductOpen: false,
  currentProduct: null,
  whyIsSelected: "",
  whyIsSelectedEdit: "",
  files: [],
  editImages: [],
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
    // ───────────── Edit Product Dialog ─────────────
    openEditProduct: (state) => {
      state.isEditProductOpen = true;
    },
    closeEditProduct: (state) => {
      state.isEditProductOpen = false;
    },
    setCurrentProduct: (state, action: PayloadAction<InputValueEdit>) => {
      state.currentProduct = action.payload;
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

    // ───────────── Edit Select Category Product Dialog ─────────────
    selectedEdit: (state, action: PayloadAction<string>) => {
      state.whyIsSelectedEdit = action.payload;
    },

    setEditImages: (state, action: PayloadAction<IEditImage[]>) => {
      state.editImages = action.payload;
    },

    addEditImage: (state, action: PayloadAction<IEditImage>) => {
      state.editImages.push(action.payload);
    },

    removeEditImage: (state, action: PayloadAction<number>) => {
      state.editImages = state.editImages.filter(
        (img) => img.id !== action.payload,
      );
    },

    clearEditImages: (state) => {
      state.editImages = [];
    },
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
  openEditProduct,
  closeEditProduct,
  setCurrentProduct,
  selectedEdit,
  setEditImages,
  addEditImage,
  removeEditImage,
  clearEditImages,
} = globalSlice.actions;
export default globalSlice.reducer;
