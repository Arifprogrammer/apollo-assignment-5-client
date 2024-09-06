import { useGetMyBookingsQuery } from "../../../../redux/features/bookings/bookingsApi";
import { TBooking } from "../../../../types";
import BookingsRowsTable from "./BookingsRowsTable";

const BookingsManagement = () => {
  //* redux hooks
  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  const bookings = data?.data as TBooking[];
  return (
    <>
      <div className="overflow-x-auto min-h-screen text-slate-800">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-slate-600 text-base">
              <th></th>
              <th>Room Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length &&
              bookings.map((booking, index) => (
                <BookingsRowsTable
                  key={booking._id}
                  booking={booking}
                  index={index}
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
              You have no bookings !!!
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsManagement;
