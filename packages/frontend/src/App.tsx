import * as React from 'react';
import './App.css';
import AppLayout from './components/pages/layout/Layout';
import AppHomePage from './components/pages/layout/home-page/HomePage';
import AppDashboardsPage from './components/pages/layout/dashboards-page/DashboardsPage';
import AppAdminPage from './components/pages/layout/admin-page/AdminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppEventSchemaCreator from './components/pages/layout/admin-page/event-schema-createor/EventSchemaCreator';
import AppEventCreator from './components/pages/layout/admin-page/event-creator/EventCreator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import IUser from './models/user';
import AppLoginPage from './components/pages/login-page/LoginPage';
import { useEffect } from "react";
import { whoami } from "./store/authSlice";
import AppDashboardPage from "./components/pages/layout/dashboards-page/dashboard-page/DashboardPage";
import Modal from 'react-modal';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export default function App() {
  const loggedUser: IUser | undefined = useSelector((state: RootState) => state.auth.loggedUser);
  const isLoading: boolean = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(whoami());
  }, [dispatch]);

  const router: React.JSX.Element = (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<AppHomePage />} />
            <Route path="dashboard" element={<AppDashboardsPage />} />
            <Route path="dashboard/:id" element={<AppDashboardPage />} />
            <Route path="admin" element={<AppAdminPage />}>
              <Route index element={<AppEventSchemaCreator />} />
              <Route path="event-schema" element={<AppEventSchemaCreator />} />
              <Route path="event" element={<AppEventCreator />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );

  return (
    <>
      { !isLoading && loggedUser ? router : <AppLoginPage /> }
      <ToastContainer />
    </>
  );
}
