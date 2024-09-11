import { useState } from "react";
import { TSlot } from "../../../../types";
import Swal from "sweetalert2";
import {
  useDeleteSlotMutation,
  useGetSlotsQuery,
} from "../../../../redux/features/slots/slotsApi";
import SlotsRowsTable from "./SlotsRowsTable";
import dayjs from "dayjs";
import EditSlotModal from "./EditSlotModal";

const InitialSlot: TSlot = {
  date: dayjs(new Date() as Date).format("YYYY-MM-DD"),
  room: "",
  startTime: "08:00",
  endTime: "09:00",
};

const SlotManagement = () => {
  //* react hooks
  const [open, setOpen] = useState(false);
  const [specificSlot, setSpecificSlot] = useState<TSlot | null>(null);

  //* redux hooks
  const { data, isLoading } = useGetSlotsQuery(undefined);
  const [deleteSlot] = useDeleteSlotMutation();

  //* variables
  const slots = data?.data as TSlot[];

  const handleDeleteSlot = (id: string) => {
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
        const { success } = await deleteSlot(id).unwrap();
        if (success) {
          Swal.fire("Deleted!", "Deleted", "success");
        }
      }
    });
  };

  const handleCreateSlot = () => {
    setSpecificSlot(InitialSlot);
    setOpen(true);
  };

  const handleEditSlot = (slot: TSlot) => {
    setSpecificSlot(slot);
    setOpen(true);
  };

  return (
    <>
      <button
        className="w-fit btn bg-black text-white mt-4 md:mt-0 mb-2"
        onClick={() => handleCreateSlot()}
      >
        Add Slot
      </button>
      <div className="overflow-x-auto min-h-fit text-slate-800 mb-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-slate-600 text-base">
              <th></th>
              <th>Room Name</th>
              <th>Room No</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots?.length &&
              slots.map((slot, index) => (
                <SlotsRowsTable
                  key={slot._id}
                  slot={slot}
                  index={index}
                  handleDeleteSlot={handleDeleteSlot}
                  handleEditSlot={handleEditSlot}
                />
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="text-center">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}
        {!slots?.length && (
          <>
            <p className="mt-10 text-rose-600 font-bold text-lg text-center">
              You have no slot !!!
            </p>
          </>
        )}
      </div>
      {specificSlot && (
        <EditSlotModal
          key={specificSlot._id}
          open={open}
          setOpen={setOpen}
          specificSlot={specificSlot}
        />
      )}
    </>
  );
};

export default SlotManagement;
