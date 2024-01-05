import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/user.interface";
import HttpClient from "../utils/httpClient";

interface LoginRequest {
    username: string;
    password: string;
}

export interface UserState {
    loggedUser: IUser;
    isLoading: boolean;
    errorMessage: string | undefined;
}

const initialState: UserState = {
    loggedUser: undefined,
    isLoading: false,
    errorMessage: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            return {...state, loggedUser: undefined};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(whoami.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loggedUser = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                console.log('login fulfilled', action.payload);
                state.loggedUser = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                console.log('register fulfilled', action.payload);
                state.loggedUser = action.payload;
            });
    },
});

export const whoami = createAsyncThunk(
    "auth/whoami",
    async () => {
        const loggedUser: IUser = await new HttpClient().get('/auth/whoami');
        return loggedUser;
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (payload: LoginRequest) => {
        const loggedUser: IUser = await new HttpClient().post('/auth/login', {
            username: payload.username,
            password: payload.password
        });
        return loggedUser;
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (payload: LoginRequest) => {
        const newUser: IUser = await new HttpClient().post('/auth/register', {
            username: payload.username,
            password: payload.password
        });
        return newUser;
    }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;