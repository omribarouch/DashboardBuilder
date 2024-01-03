import React from 'react';

const AppHomePage = () => (
   <div className="container mt-5 overflow-hidden h-auto">
   <div className="row">
     <div className="col-md-6 offset-md-3">
       <div className="card">
         <div className="card-body">
           <h2 className="card-title text-center mb-4">Welcome to Dashboard Builder Application</h2>
           <p className="card-text">
             Thank you for visiting my website. I'm are excited to have you here!
           </p>
           <p className="card-text">
             Explore our features to make the most out of your experience.
           </p>
           <a href="/dashboard" className="btn btn-primary btn-block">
             Get Started
           </a>
         </div>
       </div>
     </div>
   </div>
 </div>
);

export default AppHomePage;