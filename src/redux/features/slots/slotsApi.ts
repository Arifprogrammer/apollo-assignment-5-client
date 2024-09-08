import { TSlot } from "../../../types";
import { baseApi } from "../../api/baseApi";

const slotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: (params?: { date: string; roomId: string }) => ({
        url: `/slots/availability`,
        method: "GET",
        params: params,
      }),
      providesTags: ["slots"],
    }),

    createSlot: builder.mutation({
      query: (slot: TSlot) => {
        return {
          url: "/slots",
          method: "POST",
          body: slot,
        };
      },
      invalidatesTags: ["slots"],
    }),

    updateSlot: builder.mutation({
      query: (slot: TSlot) => {
        return {
          url: `/slots/update/${slot._id}`,
          method: "PATCH",
          body: slot,
        };
      },
      invalidatesTags: ["slots"],
    }),

    deleteSlot: builder.mutation({
      query: (id: string) => {
        return {
          url: `/slots/${id}`,
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
