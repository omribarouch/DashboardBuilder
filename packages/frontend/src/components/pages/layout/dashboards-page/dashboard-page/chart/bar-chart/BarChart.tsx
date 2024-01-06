import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FC } from "react";
import { ChildChartProps } from "../Chart";

const AppBarChart: FC<ChildChartProps> = ({ chart, breakdown }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ breakdown }>
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default AppBarChart;