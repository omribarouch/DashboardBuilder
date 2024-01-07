import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IUser from "../models/user";
import HttpClient from "../utils/httpClient";
import { toast } from 'react-toastify';

interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthState {
    loggedUser: IUser;
    isLoading: boolean;
    errorMessage: string | undefined;
}

const initialState: AuthState = {
    loggedUser: undefined,
    isLoading: false,
    errorMessage: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            return {...state, loggedUser: undefined};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(whoami.pending, (state: AuthState) => {
                state.isLoading = true;
            })
            .addCase(whoami.fulfilled, (state: AuthState, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.loggedUser = action.payload;
            })
            .addCase(login.pending, (state: AuthState) => {
                state.isLoading = true;
                state.errorMessage = undefined;
            })
            .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.loggedUser = action.payload;
                toast.success("Logged In Successfully!");
            })
            .addCase(login.rejected, (state: AuthState, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.stack;
                toast.error("Fail To Login...");
            })
            .addCase(register.pending, (state: AuthState) => {
                state.isLoading = true;
                state.errorMessage = undefined;
            })
            .addCase(register.fulfilled, (state: AuthState, action: PayloadAction<IUser>) => {
                state.isLoading = false;
                state.loggedUser = action.payload;
                toast.success("Registered Successfully!");
            })
            .addCase(register.rejected, (state: AuthState, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.stack;
                toast.error("Fail To Register...");
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