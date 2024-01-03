import React from 'react';
import ReactDOM from 'react-dom';
import AppAdminPage from './AdminPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppAdminPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});