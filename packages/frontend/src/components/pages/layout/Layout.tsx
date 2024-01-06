import * as React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import AppNavbar from './navbar/navbar';


const AppLayout = () => (
    <>
        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}
        {/*        <Route path="/" element={<AppLayout />}>*/}
        {/*            <Route index element={<AppHomePage />} />*/}
        {/*            <Route path="dashboard" element={<AppDashboardsPage />} />*/}
        {/*            <Route path="admin" element={<AppAdminPage />}>*/}
        {/*                <Route index element={<EventSchemaCreator />} />*/}
        {/*                <Route path="event-schema" element={<EventSchemaCreator />} />*/}
        {/*                <Route path="event" element={<EventCreator />} />*/}
        {/*            </Route>*/}
        {/*        </Route>*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}

        <div className='col h-100'>
            <div className='main-navbar'><AppNavbar></AppNavbar></div>

            <div className='main-content'><Outlet /></div>
        </div>
    </>
);

export default AppLayout;
