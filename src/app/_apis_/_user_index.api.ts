import { User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
register:builder.mutation({
    query:( userDetails)=>({
         url: `/user/register`,
        method: "POST",
        body:userDetails,
    })
}),
verifyEmail:builder.mutation({
    query:( userDetails)=>({
         url: `/user/verify-email`,
        method: "POST",
        body:userDetails,
    })
}),
forgotPassword:builder.mutation({
    query:( userDetails)=>({
         url: `/user/forgot-password`,
        method: "POST",
        body:userDetails,
    })
}),
forgotPasswordCheck:builder.mutation({
    query:( userDetails)=>({
         url: `/user/check-forgot-password`,
        method: "POST",
        body:userDetails,
    })
}),
   getAllUser: builder.query<{allUser:User[],count:number},string>({
      query: (page) => ({
        url: `/user/user-queries?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
     deleteAUser: builder.mutation({
      query: (id) => ({
        url: `/user/user-queries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
        updateAUser: builder.mutation({
      query: ({ id, role }) => ({
        url: `/user/user-queries/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
forgotPasswordChange:builder.mutation({
    query:( userDetails)=>({
         url: `/user/change-password`,
        method: "POST",
        body:userDetails,
    })
})
})
});

export const {
 useRegisterMutation,
 useVerifyEmailMutation,
 useForgotPasswordMutation,
 useForgotPasswordCheckMutation,
 useForgotPasswordChangeMutation,
 useGetAllUserQuery,
 useDeleteAUserMutation,
 useUpdateAUserMutation
} = userApi;
