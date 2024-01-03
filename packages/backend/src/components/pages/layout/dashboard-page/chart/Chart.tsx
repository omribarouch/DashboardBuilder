import { FC } from 'react';
import IChart from '../../../../../models/chart.interface';
import ChartType from '../../../../../models/chart-type.interface';
import AppBarChart from './bar-chart/BarChart'
import AppPieChart from './pie-chart/PieChart'
import React from 'react';
import AppErrorChart from './error-chart/ErrorChart';
import { ResponsiveContainer } from 'recharts';

export interface ChartProps {
   chart: IChart
}

const chartTypeToComponent: Map<ChartType, React.ComponentType<ChartProps>> = new Map<ChartType, React.ComponentType<ChartProps>>([
   [ChartType.Bar, AppBarChart],
   [ChartType.Pie, AppPieChart]
]);

const AppChart: FC<ChartProps> = (props: ChartProps) => {
   return (
      <ResponsiveContainer width="100%" height="auto">
      {React.createElement(chartTypeToComponent.get(props.chart.type) || AppErrorChart, {chart: props.chart})}
      </ResponsiveContainer>
   );
}

export default AppChart;