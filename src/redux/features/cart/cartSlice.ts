import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../../types";
import { RootState } from "../../store";
import { sum } from "radash";

type TInitialState = {
  cart: TProduct[];
  totalOrderQuantity: number;
  totalPrice: number;
};

const initialState: TInitialState = {
  cart: [],
  totalOrderQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setToCart: (state, action: PayloadAction<TProduct>) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex] = {
          ...state.cart[existingProductIndex],
          orderQuantity: state.cart[existingProductIndex].orderQuantity + 1,
        };
      } else state.cart.push({ ...action.payload, orderQuantity: 1 });

      state.totalOrderQuantity = calculateTotalOrderQuantity(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingProductIndex = state.cart.findIndex(
        (product) => product._id === action.payload
      );

      if (state.cart[existingProductIndex].orderQuantity >= 0) {
        state.cart[existingProductIndex] = {
          ...state.cart[existingProductIndex],
          orderQuantity: state.cart[existingProductIndex].orderQuantity - 1,
        };
      }

      state.totalOrderQuantity = calculateTotalOrderQuantity(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      state.totalOrderQuantity = calculateTotalOrderQuantity(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    resetCart: (state) => {
      state.cart = [];
      state.totalOrderQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

const calculateTotalOrderQuantity = (cart: TProduct[]) => {
  return sum(cart, (f) => f.orderQuantity);
};

const calculateTotalPrice = (cart: TProduct[]) => {
  return sum(cart, (f) => f.orderQuantity * f.price);
};

export const { setToCart, decreaseQuantity, deleteFromCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCartProducts = (state: RootState) => state.cart.cart;
export const getTotalOrderQuantity = (state: RootState) =>
  state.cart.totalOrderQuantity;
export const getTotalPrice = (state: RootState) => state.cart.totalPrice;
