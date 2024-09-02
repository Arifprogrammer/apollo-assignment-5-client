import { TRoom } from "../../../types";
import { baseApi } from "../../api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: (params: { date: string; roomId: string }) => ({
        url: `/slots/availability`,
        method: "GET",
        params: params,
      }),
      providesTags: ["slots"],
    }),

    createSlot: builder.mutation({
      query: (room: TRoom) => {
        return {
          url: "/rooms",
          method: "POST",
          body: room,
        };
      },
      invalidatesTags: ["slots"],
    }),

    updateSlot: builder.mutation({
      query: (room: TRoom) => {
        return {
          url: `/products/${room._id}`,
          method: "PUT",
          body: room,
        };
      },
      invalidatesTags: ["slots"],
    }),

    deleteSlot: builder.mutation({
      query: (id: string) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useGetSlotsQuery,
  useUpdateSlotMutation,
} = slotsApi;
