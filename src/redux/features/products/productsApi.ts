import { TProduct } from "../../../types";
import { baseApi } from "../../api/baseApi";
import { setProducts } from "./productSlice";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (limit?: number) => ({
        url: limit ? `/products?limit=${limit}` : "/products",
        method: "GET",
      }),
      providesTags: ["products"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    createProduct: builder.mutation({
      query: (product: Omit<TProduct, "orderQuantity" | "_id">) => {
        return {
          url: "/products",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProducts: builder.mutation({
      query: (products: { _id: string; orderQuantity: number }[]) => {
        return {
          url: "/products",
          method: "PUT",
          body: products,
        };
      },
      invalidatesTags: ["products"],
    }),
    updateSingleProduct: builder.mutation({
      query: (product: Omit<TProduct, "orderQuantity">) => {
        return {
          url: `/products/${product._id}`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductsMutation,
  useUpdateSingleProductMutation,
  useDeleteProductMutation,
} = productsApi;
