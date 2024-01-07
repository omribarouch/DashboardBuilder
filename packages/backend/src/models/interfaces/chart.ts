import ChartType from "./chartType";
import { Schema } from "mongoose";

interface IChart {
    type: ChartType;
    eventSchemaId: Schema.Types.ObjectId;
    schemaPropertyName: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default IChart;