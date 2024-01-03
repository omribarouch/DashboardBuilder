import React from 'react';
import ReactDOM from 'react-dom';
import AppNavbar from './navbar'

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppNavbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});