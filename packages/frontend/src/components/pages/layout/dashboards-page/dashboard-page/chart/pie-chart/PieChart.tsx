import * as React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { FC } from "react";
import { ChildChartProps } from "../Chart";

const COLORS: string[] = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#800000',
    '#008000',
    '#000080',
    '#808080',
    '#FFFFFF',
    '#000000',
];

const AppPieChart: FC<ChildChartProps> = ({ breakdown }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            {
                breakdown &&
                <PieChart>
                    <Pie data={ breakdown } dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="98%">
                        {
                            breakdown?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            }
        </ResponsiveContainer>
    );
}

export default AppPieChart;