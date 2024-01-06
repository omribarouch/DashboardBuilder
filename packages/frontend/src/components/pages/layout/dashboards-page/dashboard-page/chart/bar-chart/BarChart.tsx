import * as React from 'react';
import { mapToNameValue } from '../../../../../../../models/nameValue';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FC } from "react";
import { ChartProps } from "../Chart";

const AppBarChart: FC<ChartProps> = ({ chart }) => {
    const breakdown = mapToNameValue(new Map());

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={breakdown}>
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

export default AppBarChart;