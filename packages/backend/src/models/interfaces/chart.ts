import ChartType from "./chartType";

interface Chart {
    id: number;
    type: ChartType;
    schemaPropertyName: string;
    description?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export default Chart;