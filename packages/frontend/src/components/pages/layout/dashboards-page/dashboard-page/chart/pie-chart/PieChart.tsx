import * as React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { FC } from "react";
import { ChildChartProps } from "../Chart";

const COLORS: string[] = [
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