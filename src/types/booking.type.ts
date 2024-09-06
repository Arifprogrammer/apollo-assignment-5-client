import { TRoom } from "./room.type";
import { TSlot } from "./slot.type";

export type TBooking = {
  _id?: string;
  room: TRoom | string;
  slots: TSlot[] | string[];
  user: string;
  date: string;
  transactionId: string;
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
};
