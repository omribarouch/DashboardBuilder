import React = require("react");
import IChart from '../../../../../models/chart.interface';
import AppBarChart from './bar-chart/BarChart'
import AppPieChart from './pie-chart/PieChart'
import AppErrorChart from './error-chart/ErrorChart';
import { ResponsiveContainer } from 'recharts';
import ChartType from "../../../../../models/chart-type.interface";

export interface ChartProps {
   chart: IChart
}

const chartTypeToComponent: Map<ChartType, React.ComponentType<ChartProps>> = new Map<ChartType, React.ComponentType<ChartProps>>([
   [ChartType.Bar, AppBarChart],
   [ChartType.Pie, AppPieChart]
]);

const AppChart = (props: ChartProps) => {
   return (
      <ResponsiveContainer width="100%" height="auto">
      {React.createElement(chartTypeToComponent.get(props.chart.type) || AppErrorChart, {chart: props.chart})}
      </ResponsiveContainer>
   );
}

export default AppChart;