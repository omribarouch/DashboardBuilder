import React from 'react';
import ReactDOM from 'react-dom';
import { AppErrorChart } from './ErrorChart';
import { ChartType } from '../../../../../../../../backend/src/models/interfaces/chartType';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppErrorChart chart={{x:0, y:0, width:0, height:0, type: ChartType.Bar, name: 'gever', 
  propertyName: 'h', breakdown: new Map<string, number>()}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});