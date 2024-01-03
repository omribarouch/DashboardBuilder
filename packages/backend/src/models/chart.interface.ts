import ChartType from "./chart-type.interface";
import IDisplayable from "./displayable.inteface";


interface IChart extends IDisplayable {
    name: string;
    propertyName: string;
    breakdown: Map<string, number>;
    type: ChartType
}

export default IChart;