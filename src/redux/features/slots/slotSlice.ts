import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TInitialState = {
  selectedSlots: string[];
};

const initialState: TInitialState = {
  selectedSlots: [],
};

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setSelectedSlots: (state, action: PayloadAction<string[]>) => {
      state.selectedSlots = action.payload;
    },
  },
});

export const { setSelectedSlots } = slotsSlice.actions;

export default slotsSlice.reducer;

export const getAllSelectedSlots = (state: RootState) =>
  state.slots.selectedSlots;
