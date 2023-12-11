import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface Data {
    data: Profile;
    message: string;
    error: any;
}

export interface Profile {
    id: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    avatar: string;
    banner: string;
    location: string;
    website: string;
    pronouns: string;
    gender: string;
    verified: boolean;
    CreatedAt: string;
}

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/profile",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getProfile: builder.query<Data, string>({
            query: id => `/${id}`,
        }),
    }),
});

export const { useGetProfileQuery } = profileApi;
