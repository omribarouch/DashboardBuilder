import * as React from 'react';
import { Outlet } from 'react-router-dom';

const AppAdminPage = () => (
   <>
      <div className="container-fluid h-100">
         <div className="row h-100">
            <div className="col-sm-auto bg-light sticky-top">
               <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                  <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                     <i className="bi-bootstrap fs-1"></i>
                  </a>

                  <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                     <li className="nav-item">
                        <a className="nav-link" href="/admin/event-schema">Event Schemas</a>
                     </li>

                     <li className='nav-item'>
                        <a className="nav-link" href="/admin/event">Events</a>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="col-sm p-3 h-100">
                  <Outlet />
            </div>
         </div>
      </div>
    </>
);

export default AppAdminPage;