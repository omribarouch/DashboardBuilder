import ChartType from "../../models/chart-type.interface";
import IChart from "models/chart.interface";

interface DashboardState {
   charts: IChart[]
}

const initialState: DashboardState = {
   charts: [
      {x: 0, y: 0, width: 4, height: 4, name: "melachim", propertyName: "Name", breakdown: new Map<string, number>([
         ["gever", 90], 
         ["melech1", 30],
         ["melech2", 10]
      ]), type: ChartType.Bar},
      {x: 4, y: 0, width: 4, height: 4, name: "ages", propertyName: "Age", 
      breakdown: new Map<string, number>([["12", 10], ["42", 6]]), type: ChartType.Pie}
   ]
};

const dashboardReducer = (state = initialState, action) => {
   switch(action) {
      default: 
         return state;
   }
}

export default dashboardReducer;