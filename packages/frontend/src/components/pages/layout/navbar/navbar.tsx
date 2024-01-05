import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { logout } from '../../../../store/authSlice';
import { IUser } from '../../../../models/user.interface';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
   const loggedUser: IUser = useSelector((state: RootState) => state.auth.loggedUser);
   const dispatch = useDispatch<AppDispatch>();

   return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark p-2">
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         
         <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
               <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
               </li>
               
               <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboards</Link>
               </li>
               
               <li className="nav-item">
                   <Link className="nav-link" to="/admin">Admin</Link>
               </li>
            </ul>
         </div>

         <div className='text-white'>
            <span className='me-2'>Hello { loggedUser.username }!</span>
            <button className="btn btn-outline-primary" onClick={() => dispatch(logout())}>Logout</button>
         </div>
      </nav>
   );
}

export default AppNavbar;
