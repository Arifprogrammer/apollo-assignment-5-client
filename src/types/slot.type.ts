export type TSlot = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  isBooked?: boolean;

  createdAt?: string;
  updatedAt?: string;
};
