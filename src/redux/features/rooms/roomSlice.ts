import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRoom } from "../../../types";
import { RootState } from "../../store";

type TInitialState = {
  rooms: TRoom[];
};

const initialState: TInitialState = {
  rooms: [],
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<TRoom[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;

export const getAllRooms = (state: RootState) => state.rooms;
