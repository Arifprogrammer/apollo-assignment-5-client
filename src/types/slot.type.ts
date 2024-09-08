import { TRoom } from "./room.type";

export type TSlot = {
  _id?: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string | TRoom;
  isBooked?: boolean;

  createdAt?: string;
  updatedAt?: string;
};
