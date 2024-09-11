import Swal from "sweetalert2";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../../../redux/features/bookings/bookingsApi";
import { TBooking } from "../../../../types";
import BookingsRowsTable from "./BookingsRowsTable";

const BookingsManagement = () => {
  //* redux hooks
  const { data, isLoading } = useGetBookingsQuery(undefined);
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();

  //* variables
  const bookings = data?.data as TBooking[];

  const handleDeleteBooking = (id: string) => {
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
        const { success } = await deleteBooking(id).unwrap();
        if (success) {
          Swal.fire("Deleted!", "Deleted", "success");
        }
      }
    });
  };

  const handleUpdateBooking = async (body: {
    id: string;
    isConfirmed: "confirmed" | "canceled";
  }) => {
    try {
      const res = await updateBooking(body).unwrap();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${res.message}`,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `${err?.data?.errorMessages[0]?.message}`,
      });
    }
  };

  return (
    <>
      <div className="overflow-x-auto min-h-screen text-slate-800">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-slate-600 text-base">
              <th></th>
              <th>Room Name</th>
              <th>User Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length &&
              bookings.map((booking, index) => (
                <BookingsRowsTable
                  key={booking._id}
                  booking={booking}
                  index={index}
                  handleDeleteBooking={handleDeleteBooking}
                  handleUpdateBooking={handleUpdateBooking}
                />
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="text-center">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}
        {!bookings?.length && (
          <>
            <p className="mt-10 text-rose-600 font-bold text-lg text-center">
              No bookings found !!!
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsManagement;
