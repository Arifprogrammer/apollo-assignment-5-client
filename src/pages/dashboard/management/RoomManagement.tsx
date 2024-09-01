import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
} from "../../../redux/features/rooms/roomsApi";
import { getAllRooms } from "../../../redux/features/rooms/roomSlice";
import RoomsRowsTable from "../../../components/ui/roomsManagement/RoomsRowsTable";
import { useAppSelector } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { TRoom } from "../../../types";
import Swal from "sweetalert2";
import EditRoomModal from "../../../components/ui/roomsManagement/EditRoomModal";

const InitialProduct = {
  _id: "",
  name: "",
  images: [],
  roomNo: 0,
  floorNo: 0,
  capacity: 0,
  pricePerSlot: 0,
  amenities: [],
};

const RoomManagement = () => {
  const [open, setOpen] = useState(false);
  const [specificRoom, setSpecificRoom] = useState<TRoom | null>(null);

  const { isLoading, refetch } = useGetRoomsQuery(undefined);
  const { rooms } = useAppSelector(getAllRooms);
  const [deleteProduct] = useDeleteRoomMutation();

  const handleDeleteRoom = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { success } = await deleteProduct(id).unwrap();
        if (success) {
          Swal.fire("Deleted!", "Deleted", "success");
        }
      }
    });
  };

  const handleCreateProduct = () => {
    setSpecificRoom(InitialProduct);
    setOpen(true);
  };

  const handleEditRoom = (room: TRoom) => {
    setSpecificRoom(room);
    setOpen(true);
  };

  //* effects
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <button
        className="w-fit btn bg-black text-white mt-4 md:mt-0 mb-2"
        onClick={() => handleCreateProduct()}
      >
        Add Room
      </button>
      <div className="overflow-x-auto min-h-screen text-slate-800">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-slate-600 text-base">
              <th></th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms?.map((room, index) => (
                <RoomsRowsTable
                  key={room._id}
                  room={room}
                  index={index}
                  handleEditRoom={handleEditRoom}
                  handleDeleteRoom={handleDeleteRoom}
                />
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="text-center">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}
        {!rooms?.length && (
          <>
            <p className="mt-10 text-rose-600 font-bold text-lg text-center">
              You have no room !!!
            </p>
          </>
        )}
      </div>
      {specificRoom && (
        <EditRoomModal
          key={specificRoom._id}
          open={open}
          setOpen={setOpen}
          specificRoom={specificRoom}
        />
      )}
    </>
  );
};

export default RoomManagement;
