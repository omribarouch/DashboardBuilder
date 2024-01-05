import React from 'react';
import ReactDOM from 'react-dom';
import AppChart from './Chart';
import ChartType from "../../../../../models/chart-type.interface";

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppChart chart={{x:0, y:0, width:0, height:0, type: ChartType.Bar, name: 'gever', 
  propertyName: 'h', breakdown: new Map<string, number>()}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});