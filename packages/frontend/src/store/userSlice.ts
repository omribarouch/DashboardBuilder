import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/user.interface";
import HttpClient from "../utils/httpClient";

interface LoginRequest {
    username: string;
    password: string;
}
export interface UserState {
    loggedUser: IUser;
    users: IUser[];
    isLoading: boolean;
    errorMessage: string | undefined;
}

const loadUserFromStorage = (): IUser | undefined => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : undefined;
};

const initialState: UserState = {
    loggedUser: loadUserFromStorage(),
    users: [],
    isLoading: false,
    errorMessage: undefined
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            return {...state, loggedUser: undefined};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.users.push(action.payload);
            state.loggedUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(login.fulfilled, (state, action: any) => {
            state.isLoading = false;

            if (!state.users.find(user => user.username === action.username)) {
                state.users.push(action.payload);
            }
            state.loggedUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
    },
});

export const login = createAsyncThunk(
    "user/login",
    async (payload: LoginRequest) => {
        await new HttpClient().post('/auth/login', {
            username: payload.username,
            password: payload.password
        });
        return {name: payload.username, password: payload.password, isAdmin: false};
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (user: IUser) => {
        await new HttpClient().post('/auth/register', {
            username: user.username,
            password: user.password
        });
        return user;
    }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;