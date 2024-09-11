import { TUser } from "../../../../redux/features/auth/authSlice";
import { TBooking, TRoom, TSlot } from "../../../../types";

interface RoomsRowsTableProps {
  booking: TBooking;
  index: number;
  handleDeleteBooking: (id: string) => void;
  handleUpdateBooking: (body: {
    id: string;
    isConfirmed: "confirmed" | "canceled";
  }) => void;
}

const BookingsRowsTable = ({
  booking,
  index,
  handleDeleteBooking,
  handleUpdateBooking,
}: RoomsRowsTableProps) => {
  const { _id, room, slots, isConfirmed, date, user } = booking;

  return (
    <>
      <tr className="font-bold text-nowrap">
        <th>{index + 1}</th>
        <td>{(room as TRoom).name}</td>
        <td>{(user as TUser).name}</td>
        <td>{date}</td>
        <td>
          {(slots as TSlot[]).map((slot) => (
            <p key={slot._id}>
              {slot.startTime} - {slot.endTime}
            </p>
          ))}
        </td>
        <td>{isConfirmed}</td>
        <td>
          {isConfirmed === "unconfirmed" && (
            <button
              className="px-3 border-2 border-emerald-600 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-3xl block w-20 mb-2"
              onClick={() =>
                handleUpdateBooking({ id: _id!, isConfirmed: "confirmed" })
              }
            >
              Approve
            </button>
          )}
          {isConfirmed === "unconfirmed" && (
            <button
              className="px-3 border-2 border-rose-600 text-rose-600 hover:text-white hover:bg-rose-600 rounded-3xl w-20"
              onClick={() =>
                handleUpdateBooking({ id: _id!, isConfirmed: "canceled" })
              }
            >
              Reject
            </button>
          )}
          {isConfirmed === "canceled" && (
            <button
              className="px-3 border-2 border-rose-600 text-rose-600 hover:text-white hover:bg-rose-600 rounded-3xl w-20"
              onClick={() => handleDeleteBooking(_id!)}
            >
              Delete
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default BookingsRowsTable;
