import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboard-reducer';
import authSlice from './authSlice';
import eventSchemaSlice from "./eventSchemaSlice";

export const store = configureStore({
    reducer: {
        dashboards: dashboardReducer,
        eventSchemas: eventSchemaSlice,
        auth: authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
