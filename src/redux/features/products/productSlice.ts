import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../../types";
import { RootState } from "../../store";

type TInitialState = {
  products: TProduct[];
};

const initialState: TInitialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const getAllProducts = (state: RootState) => state.products;
