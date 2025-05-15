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
 useForgotPasswordChangeMutation
} = userApi;
