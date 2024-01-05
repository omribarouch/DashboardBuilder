import * as React from 'react';
import { Component } from 'react';
import { mapToNameValue } from '../../../../../../models/name-value';
import { ChartProps } from '../Chart';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

class AppBarChart extends Component<ChartProps> {
   private breakdown = mapToNameValue(this.props.chart.breakdown);

   render() {
      return (
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={this.breakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
         </ResponsiveContainer>
      );
   }
}

export default AppBarChart;