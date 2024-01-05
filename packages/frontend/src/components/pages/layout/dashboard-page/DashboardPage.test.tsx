import React from 'react';
import ReactDOM from 'react-dom';
import AppDashboardPage from './DashboardPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppDashboardPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});