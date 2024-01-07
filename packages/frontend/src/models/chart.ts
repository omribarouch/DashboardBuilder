import ChartType from "./chartType";
import IDisplayable from "./displayable";

interface IChart extends IDisplayable {
    _id?: string;
    type: ChartType;
    eventSchemaId: string;
    schemaPropertyName: string;
    description: string;
}

export default IChart;