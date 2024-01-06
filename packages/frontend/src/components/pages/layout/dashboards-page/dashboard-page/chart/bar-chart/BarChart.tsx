import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FC } from "react";
import { ChildChartProps } from "../Chart";

const AppBarChart: FC<ChildChartProps> = ({ chart, breakdown }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart>
                { Object.keys(breakdown).map(key =>
                    <>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={ key } />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={ breakdown[key] } fill="#8884d8" />
                    </>
                )
                }
            </BarChart>
        </ResponsiveContainer>
    );
}

export default AppBarChart;