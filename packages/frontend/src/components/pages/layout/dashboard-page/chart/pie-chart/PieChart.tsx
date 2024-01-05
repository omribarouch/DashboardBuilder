import * as React from 'react';
import { Component } from 'react';
import { ChartProps } from '../Chart';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { mapToNameValue } from '../../../../../../models/name-value';

class AppPieChart extends Component<ChartProps> {
   private breakdown = mapToNameValue(this.props.chart.breakdown);

   private COLORS: string[] = [
      '#FF0000', // Red
      '#00FF00', // Green
      '#0000FF', // Blue
      '#FFFF00', // Yellow
      '#FF00FF', // Magenta
      '#00FFFF', // Cyan
      '#800000', // Maroon
      '#008000', // Olive
      '#000080', // Navy
      '#808080', // Gray
      '#FFFFFF', // White
      '#000000', // Black
    ];
   
   render() {
      return (
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie data={this.breakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="98%">
               {this.breakdown.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
               ))}
            </Pie>
            <Tooltip />
            <Legend />
         </PieChart>
         </ResponsiveContainer>
      );
   }
}

export default AppPieChart;