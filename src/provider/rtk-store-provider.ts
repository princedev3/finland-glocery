import { commentApi } from "@/app/_apis_/_comment_index.apis";
import { likeApi } from "@/app/_apis_/_like_index.apis";
import { productApi } from "@/app/_apis_/_product_index.apis";
import { userApi } from "@/app/_apis_/_user_index.api";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
      reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [commentApi.reducerPath]: commentApi.reducer,
      [likeApi.reducerPath]: likeApi.reducer,
  },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware)
 .concat(productApi.middleware)
 .concat(commentApi.middleware)
 .concat(likeApi.middleware)
})