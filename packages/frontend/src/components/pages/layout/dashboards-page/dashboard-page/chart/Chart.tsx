import * as React from 'react';
import IChart from '../../../../../../models/chart';
import AppBarChart from './bar-chart/BarChart'
import AppPieChart from './pie-chart/PieChart'
import AppErrorChart from './error-chart/ErrorChart';
import { ResponsiveContainer } from 'recharts';
import ChartType from "../../../../../../models/chartType";
import { AppDispatch } from "../../../../../../store/store";
import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { getBreakdownBySchemaProperty } from "../../../../../../store/eventSchemaSlice";

export interface BaseChartProps {
   chart: IChart
}

export interface ChildChartProps extends BaseChartProps {
   breakdown: Record<string, number>;
}

const chartTypeToComponent: Map<ChartType, FC<ChildChartProps>> = new Map<ChartType, FC<ChildChartProps>>([
   [ChartType.Bar, AppBarChart],
   [ChartType.Pie, AppPieChart]
]);

const AppChart: FC<BaseChartProps> = ({ chart }) => {
   const breakdown: Record<string, number> = {gever: 5, tttt: 2};
   const dispatch: AppDispatch = useDispatch();

   // useEffect(() => {
   //    dispatch(getBreakdownBySchemaProperty({
   //       eventSchemaId: '65987040e33797fb099bb68a',
   //       schemaPropertyName: 'isGever'
   //    }));
   // }, []);

   return (
      <ResponsiveContainer width="100%" height="auto">
      {React.createElement(chartTypeToComponent.get(chart.type) || AppErrorChart, { chart, breakdown })}
      </ResponsiveContainer>
   );
}

export default AppChart;