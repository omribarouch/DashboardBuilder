import React from 'react';
import ReactDOM from 'react-dom';
import AppBarChart from './BarChart';
import ChartType from '../../../../../../models/chart-type.interface';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppBarChart chart={{x:0, y:0, width:0, height:0, type: ChartType.Bar, name: 'gever', 
  propertyName: 'h', breakdown: new Map<string, number>()}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});