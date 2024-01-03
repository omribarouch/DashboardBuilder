import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboard-reducer';
import eventSchemaReducer from './reducers/event-schema-reducer';
import userSlice from './userSlice';

export const store = configureStore({
    reducer: {
        dashboards: dashboardReducer,
        eventSchemas: eventSchemaReducer,
        user: userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
