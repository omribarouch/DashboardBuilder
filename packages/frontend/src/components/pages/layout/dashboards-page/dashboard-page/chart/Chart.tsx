import * as React from 'react';
import IChart from '../../../../../../models/chart';
import AppBarChart from './bar-chart/BarChart';
import AppPieChart from './pie-chart/PieChart';
import ChartType from "../../../../../../models/chartType";
import { AppDispatch, RootState } from "../../../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { NameValue } from "../../../../../../models/nameValue";
import { getBreakdownBySchemaProperty } from "../../../../../../store/eventSchemaSlice";

export interface BaseChartProps {
    chart: IChart
}

export interface ChildChartProps {
    breakdown: NameValue[];
}

const chartTypeToComponent: Map<ChartType, FC<ChildChartProps>> = new Map<ChartType, FC<ChildChartProps>>([
    [ChartType.Bar, AppBarChart],
    [ChartType.Pie, AppPieChart]
]);

const AppChart: FC<BaseChartProps> = ({ chart }) => {
    const { isLoading, breakdownData } = useSelector((state: RootState) => state.eventSchemas
        .breakdowns[chart._id] || {isLoading: true, breakdownData: []});
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getBreakdownBySchemaProperty({
            chartId: chart._id,
            eventSchemaId: chart.eventSchemaId,
            schemaPropertyName: chart.schemaPropertyName
        }));
    }, [chart.schemaPropertyName]);

   return (
          <>
             <div className="text-center mb-2">{ chart.description }</div>
             {React.createElement(chartTypeToComponent.get(chart.type),
                 { breakdown: breakdownData })}
          </>
   );
}

export default AppChart;