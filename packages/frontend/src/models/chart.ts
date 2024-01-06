import ChartType from "./chartType";

interface IChart {
    _id?: string;
    type: ChartType;
    eventSchemaId: string;
    schemaPropertyName: string;
    description?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default IChart;