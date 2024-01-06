import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import eventSchemaSlice from "./eventSchemaSlice";
import eventSlice from "./eventSlice";
import dashboardSlice from "./dashboardSlice";
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
    reducer: {
        auth: authSlice,
        eventSchemas: eventSchemaSlice,
        events: eventSlice,
        dashboards: dashboardSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
