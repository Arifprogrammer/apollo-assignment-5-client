import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
} from "../../../../redux/features/rooms/roomsApi";
import RoomsRowsTable from "./RoomsRowsTable";
import { useEffect, useState } from "react";
import { TQueryType, TRoom } from "../../../../types";
import Swal from "sweetalert2";
import EditRoomModal from "./EditRoomModal";
import { list } from "radash";
import Pagination from "../../../../components/ui/pagination/Pagination";

const InitialProduct = {
  name: "",
  images: [],
  roomNo: 0,
  floorNo: 0,
  capacity: 0,
  pricePerSlot: 0,
  amenities: [],
};

const RoomManagement = () => {
  //* react hooks
  const [open, setOpen] = useState(false);
  const [specificRoom, setSpecificRoom] = useState<TRoom | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<TQueryType | undefined>(undefined);

  //* redux hooks
  const { isLoading, data, error } = useGetRoomsQuery(query);
  const [deleteProduct] = useDeleteRoomMutation();

  //* variables
  const allRooms = data?.data as TRoom[];
  const totalPage = data?.meta.totalPage;

  //* effects
  useEffect(() => {
    const query: TQueryType = {
      limit: 6,
      page: page,
      searchTerm: "",
      sort: "",
    };

    setQuery((prev) => ({
      ...prev,
      ...query,
    }));
  }, [page]);

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
              <th>Room Name</th>
              <th>Room No</th>
              <th>Floor No</th>
              <th>Capacity</th>
              <th>Price Per Slot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allRooms?.length &&
              allRooms.map((room, index) => (
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
        {!allRooms?.length && (
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

      <div className="text-center mb-6 md:mb-8">
        {!error &&
          list(1, totalPage).map((pageNumber) => (
            <Pagination
              key={pageNumber}
              index={pageNumber}
              page={page}
              setPage={setPage}
            />
          ))}
      </div>
    </>
  );
};

export default RoomManagement;
