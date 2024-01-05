import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboard-reducer';
import userSlice from './userSlice';
import eventSchemaSlice from "./eventSchemaSlice";

export const store = configureStore({
    reducer: {
        dashboards: dashboardReducer,
        eventSchemas: eventSchemaSlice,
        user: userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
