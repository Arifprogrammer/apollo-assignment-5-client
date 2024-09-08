import { TRoom, TSlot } from "../../../../types";

interface SlotsRowsTableProps {
  slot: TSlot;
  index: number;
  handleDeleteSlot: (id: string) => void;
  handleEditSlot: (slot: TSlot) => void;
}

const SlotsRowsTable = ({
  slot,
  index,
  handleDeleteSlot,
  handleEditSlot,
}: SlotsRowsTableProps) => {
  const { _id, room, startTime, endTime, date } = slot;

  return (
    <>
      <tr className="font-bold">
        <th>{index + 1}</th>
        <td>{(room as TRoom)?.name}</td>
        <td>{(room as TRoom)?.roomNo}</td>
        <td>{date}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>
          <button
            className="px-3 border-2 border-black text-black hover:text-white hover:bg-black rounded-3xl block w-20 mb-2"
            onClick={() => handleEditSlot(slot)}
          >
            Edit
          </button>
          <button
            className="px-3 border-2 border-rose-600 text-rose-600 hover:text-white hover:bg-rose-600 rounded-3xl w-20"
            onClick={() => handleDeleteSlot(_id!)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default SlotsRowsTable;
