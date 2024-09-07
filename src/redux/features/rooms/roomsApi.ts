import { TQueryType, TRoom } from "../../../types";
import { baseApi } from "../../api/baseApi";

const roomsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleRooms: builder.query({
      query: (roomId: string) => ({
        url: `/rooms/${roomId}`,
        method: "GET",
      }),
      providesTags: ["rooms"],
    }),

    getRooms: builder.query({
      query: (query: TQueryType | undefined) => ({
        url: query
          ? `/rooms?limit=${query.limit}&sort=${query.sort}&page=${query.page}&searchTerm=${query.searchTerm}`
          : "/rooms",
        method: "GET",
      }),
      providesTags: ["rooms"],
    }),

    createRoom: builder.mutation({
      query: (room: TRoom) => {
        return {
          url: "/rooms",
          method: "POST",
          body: room,
        };
      },
      invalidatesTags: ["rooms"],
    }),

    updateRoom: builder.mutation({
      query: (room: TRoom) => {
        return {
          url: `/rooms/${room._id}`,
          method: "PUT",
          body: room,
        };
      },
      invalidatesTags: ["rooms"],
    }),

    deleteRoom: builder.mutation({
      query: (id: string) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useGetSingleRoomsQuery,
  useUpdateRoomMutation,
} = roomsApi;
