import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { replaceOrAppend } from "radash";

type TInitialState = {
  selectedSlots: { id: string; time: string }[];
};

const initialState: TInitialState = {
  selectedSlots: [],
};

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setSelectedSlots: (
      state,
      action: PayloadAction<{ id: string; time: string }>
    ) => {
      state.selectedSlots = replaceOrAppend(
        state.selectedSlots,
        action.payload,
        (f) => f.id === action.payload.id
      );
    },

    deleteSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlots = state.selectedSlots.filter(
        (selectedSlot) => selectedSlot.id !== action.payload
      );
    },

    resetSlotsId: (state) => {
      state.selectedSlots = [];
    },
  },
});

export const { setSelectedSlots, resetSlotsId, deleteSlot } =
  slotsSlice.actions;

export default slotsSlice.reducer;

export const getAllSelectedSlots = (state: RootState) =>
  state.slots.selectedSlots;
