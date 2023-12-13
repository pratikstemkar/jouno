import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Data } from "./profile";

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    roles: Array<string>;
}

export interface UserResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    identity: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    email: string;
    username: string;
}

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/auth/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: credentials => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
        }),
        protected: builder.mutation<{ message: string }, void>({
            query: () => "protected",
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: credentials => ({
                url: "register",
                method: "POST",
                body: credentials,
            }),
        }),
        checkTokenAuth: builder.query<Data, string>({
            query: id => `${id}`,
        }),
    }),
});

export const {
    useLoginMutation,
    useProtectedMutation,
    useRegisterMutation,
    useCheckTokenAuthQuery,
} = authApi;
