import { TRoom } from "../../../../types";

interface RoomsRowsTableProps {
  room: TRoom;
  index: number;
  handleDeleteRoom: (id: string) => void;
  handleEditRoom: (room: TRoom) => void;
}

const RoomsRowsTable = ({
  room,
  index,
  handleDeleteRoom,
  handleEditRoom,
}: RoomsRowsTableProps) => {
  const { _id, name, pricePerSlot, capacity, roomNo, floorNo } = room;

  return (
    <>
      <tr className="font-bold">
        <th>{index + 1}</th>
        <td>{name}</td>
        <td>{roomNo}</td>
        <td>{floorNo}</td>
        <td>{capacity}</td>
        <td>$ {pricePerSlot}</td>
        <td>
          <button
            className="px-3 border-2 border-black text-black hover:text-white hover:bg-black rounded-3xl block w-20 mb-2"
            onClick={() => handleEditRoom(room)}
          >
            Edit
          </button>
          <button
            className="px-3 border-2 border-rose-600 text-rose-600 hover:text-white hover:bg-rose-600 rounded-3xl w-20"
            onClick={() => handleDeleteRoom(_id!)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default RoomsRowsTable;
