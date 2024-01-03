import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/lib/services/auth";
import { RootState } from "../store";

type AuthState = {
    user: User | null;
    token: string | null;
};

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null } as AuthState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { user, token },
            }: PayloadAction<{ user: User | null; token: string | null }>
        ) => {
            state.user = user;
            state.token = token;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token!);
        },
        logout: state => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
