import * as React from 'react';
import './App.css';
import AppLayout from './components/pages/layout/Layout';
import AppHomePage from './components/pages/layout/home-page/HomePage';
import AppDashboardPage from './components/pages/layout/dashboard-page/DashboardPage';
import AppAdminPage from './components/pages/layout/admin-page/AdminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventSchemaCreator from './components/pages/layout/admin-page/event-schema-createor/EventSchemaCreator';
import EventCreator from './components/pages/layout/admin-page/event-creator/EventCreator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { IUser } from './models/user.interface';
import LoginPage from './components/pages/login-page/LoginPage';
import { useEffect } from "react";
import { whoami } from "./store/authSlice";

export default function App() {
  const loggedUser: IUser | undefined = useSelector((state: RootState) => state.user.loggedUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(whoami());
  }, []);

  const router: React.JSX.Element = (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<AppHomePage />} />
            <Route path="dashboard" element={<AppDashboardPage />} />
            <Route path="admin" element={<AppAdminPage />}>
              <Route index element={<EventSchemaCreator />} />
              <Route path="event-schema" element={<EventSchemaCreator />} />
              <Route path="event" element={<EventCreator />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );

  return (
    <>
      { loggedUser ? router : <LoginPage /> }
    </>
  );
}
