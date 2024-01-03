import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { logout } from '../../../../store/userSlice';
import { IUser } from '../../../../models/user.interface';

const AppNavbar = () => {
   const loggedUser: IUser = useSelector((state: RootState) => state.user.loggedUser);
   const dispatch = useDispatch<AppDispatch>();

   return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         
         <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
               <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
               </li>
               
               <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboards</a>
               </li>
               
               <li className="nav-item">
                  <a className="nav-link" href="/admin">Admin</a>
               </li>
            </ul>
         </div>

         <div className='text-white'>
            <span className='me-2'>Hello {loggedUser.name}!</span>
            <a className="nav-item" href='/' onClick={() => dispatch(logout())}>Logout</a>
         </div>
      </nav>
   );
}

export default AppNavbar;
