import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authReducer from "./features/authSlice";
import { profileApi } from "./services/profile";
import { postApi } from "./services/post";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            auth: authReducer,
            [profileApi.reducerPath]: profileApi.reducer,
            [postApi.reducerPath]: postApi.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware()
                .concat(authApi.middleware)
                .concat(profileApi.middleware)
                .concat(postApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
