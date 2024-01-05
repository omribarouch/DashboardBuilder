import * as React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import AppNavbar from './navbar/navbar';


const AppLayout = () => (
   <div className='col h-100'>
      <div className='main-navbar'><AppNavbar></AppNavbar></div>

      <div className='main-content'><Outlet /></div>
   </div>
);

export default AppLayout;
