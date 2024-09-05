import { TBooking, TRoom } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (params: { date: string; roomId: string }) => ({
        url: `/bookings`,
        method: "GET",
        params: params,
      }),
      providesTags: ["bookings"],
    }),

    createPaymentIntent: builder.mutation({
      query: (price: number) => {
        return {
          url: "/bookings/create-payment-intent",
          method: "POST",
          body: { price },
        };
      },
    }),

    createBooking: builder.mutation({
      query: (booking: Partial<TBooking>) => {
        return {
          url: "/bookings",
          method: "POST",
          body: booking,
        };
      },
      invalidatesTags: ["bookings"],
    }),
    updateBooking: builder.mutation({
      query: (room: TRoom) => {
        return {
          url: `/products/${room._id}`,
          method: "PUT",
          body: room,
        };
      },
      invalidatesTags: ["bookings"],
    }),

    deleteBooking: builder.mutation({
      query: (id: string) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCreatePaymentIntentMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
} = bookingsApi;
