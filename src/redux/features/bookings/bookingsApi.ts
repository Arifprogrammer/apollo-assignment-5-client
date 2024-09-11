import { TBooking } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),

    getMyBookings: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
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
      query: (body: { id: string; isConfirmed: "confirmed" | "canceled" }) => {
        return {
          url: `/bookings/${body.id}`,
          method: "PUT",
          body: { isConfirmed: body.isConfirmed },
        };
      },
      invalidatesTags: ["bookings"],
    }),

    deleteBooking: builder.mutation({
      query: (id: string) => {
        return {
          url: `/bookings/${id}`,
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
  useGetMyBookingsQuery,
  useUpdateBookingMutation,
} = bookingsApi;
