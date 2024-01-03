import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface Data {
    data: any;
    message: string;
    error: any;
}

export interface Post {
    id: string;
    title: string;
    body: string;
    CreatedAt: string;
}

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/post",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getAllPosts: builder.query<Data, string>({
            query: () => ``,
        }),
    }),
});

export const { useGetAllPostsQuery } = postApi;
