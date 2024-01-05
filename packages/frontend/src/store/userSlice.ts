import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "models/user.interface";

interface LoginRequest {
    username: string;
    password: string;
}
export interface UserState {
    loggedUser: IUser;
    users: IUser[];
}

const loadUserFromStorage = (): IUser | undefined => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : undefined;
  };

const initialState: UserState = {
   loggedUser: loadUserFromStorage(),
   users: []
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
        builder.addCase(register.pending, () => {
            console.log("register.pending");
        });
        
        builder.addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
            state.loggedUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        
        builder.addCase(login.pending, () => {
            console.log("register.pending");
        });
        
        builder.addCase(login.fulfilled, (state, action: any) => {
            if (!state.users.find(user => user.name === action.username)) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {name: payload.username, password: payload.password, isAdmin: true};
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (user: IUser) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return user;
    }
  );

export const { logout } = userSlice.actions;

export default userSlice.reducer;