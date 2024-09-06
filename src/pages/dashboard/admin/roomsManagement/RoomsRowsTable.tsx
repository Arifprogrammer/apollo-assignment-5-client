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
  const { _id, name, images, pricePerSlot } = room;

  return (
    <>
      <tr className="font-bold">
        <th>{index + 1}</th>
        <td>
          <span className="flex items-center space-x-3">
            <span className="avatar">
              <span className="mask mask-squircle w-12 h-12">
                <img src={images[0]} alt="class picture" />
              </span>
            </span>
          </span>
        </td>
        <td>{name}</td>
        {/* <td>{brand}</td> */}
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
            onClick={() => handleDeleteRoom(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default RoomsRowsTable;
