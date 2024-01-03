import React from 'react';
import ReactDOM from 'react-dom';
import AppHomePage from './HomePage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHomePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});