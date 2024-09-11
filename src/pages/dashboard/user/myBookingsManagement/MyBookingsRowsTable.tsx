import { TBooking, TRoom, TSlot } from "../../../../types";

interface RoomsRowsTableProps {
  booking: TBooking;
  index: number;
}

const MyBookingsRowsTable = ({ booking, index }: RoomsRowsTableProps) => {
  const { room, slots, isConfirmed, date } = booking;

  return (
    <>
      <tr className="font-bold">
        <th>{index + 1}</th>
        <td>{(room as TRoom).name}</td>
        <td>{date}</td>
        <td>
          {(slots as TSlot[]).map((slot) => (
            <p key={slot._id}>
              {slot.startTime} - {slot.endTime}
            </p>
          ))}
        </td>
        <td>{isConfirmed}</td>
      </tr>
    </>
  );
};

export default MyBookingsRowsTable;
