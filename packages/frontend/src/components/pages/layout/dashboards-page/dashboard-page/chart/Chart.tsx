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
import { NameValue } from "../../../../../../models/nameValue";

export interface BaseChartProps {
   chart: IChart
}

export interface ChildChartProps extends BaseChartProps {
   breakdown: NameValue[];
}

const chartTypeToComponent: Map<ChartType, FC<ChildChartProps>> = new Map<ChartType, FC<ChildChartProps>>([
   [ChartType.Bar, AppBarChart],
   [ChartType.Pie, AppPieChart]
]);

const AppChart: FC<BaseChartProps> = ({ chart }) => {
   const breakdown: NameValue[] = [{name: 'gever', value: 5}, {name: 'yeled', value: 2}];
   const dispatch: AppDispatch = useDispatch();

   // useEffect(() => {
   //    dispatch(getBreakdownBySchemaProperty({
   //       eventSchemaId: '65987040e33797fb099bb68a',
   //       schemaPropertyName: 'isGever'
   //    }));
   // }, []);

   return (
          <>
             <div className="text-center mb-2">{ chart.description }</div>
             {React.createElement(chartTypeToComponent.get(chart.type) || AppErrorChart, { chart, breakdown })}
          </>
   );
}

export default AppChart;