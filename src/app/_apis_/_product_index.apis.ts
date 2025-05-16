import { ProductType } from "@/constants/types";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
 createProduct:builder.mutation({
  query:(formdata)=>({
    url:"/product/product-queries",
    method:"POST",
    body:formdata
  }),
    invalidatesTags: ["Product"],
 }),
   getAllProduct: builder.query<ProductType, { page: number; search?: string }>({
      query: ({ page, search = '' }: { page: number; search?: string }) => ({
        url: `/product/product-queries?page=${page}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
   getSingleProduct: builder.query<{getSingleFetch:Product},string>({
      query: (id) => ({
        url: `/product/product-queries/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
   deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `/product/product-queries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
   getRecommendedProducts: builder.query<{getSingleFetch:Product[]},string>({
      query: (cat) => ({
        url: `/product/recommended/${cat}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
   getNewArrivalProducts: builder.query<{allProducts:Product[]},null>({
      query: () => ({
        url: `/product/newarrival`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
      updateProduct: builder.mutation({
      query: (formdata) => {
        const id = formdata.get("id");
        const cleanId = decodeURIComponent(id).replace(/^"|"$/g, "");
        return {
          url: `/product/product-queries/${cleanId}`,
          method: "PUT",
          body: formdata,
        };
      },
      invalidatesTags: ["Product"],
    }),
   getDiscountedProducts: builder.query<{allProducts:Product[]},null>({
      query: () => ({
        url: `/product/discount`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
})
});

export const {
useCreateProductMutation,
useGetAllProductQuery,
useGetSingleProductQuery,
useGetRecommendedProductsQuery,
useGetNewArrivalProductsQuery,
useGetDiscountedProductsQuery,
useDeleteSingleProductMutation,
useUpdateProductMutation
} = productApi;
