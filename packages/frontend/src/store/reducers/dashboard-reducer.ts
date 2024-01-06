import IChart from "models/chart.interface";

interface DashboardState {
   charts: IChart[]
}

const initialState: DashboardState = {
   charts: []
};

const dashboardReducer = (state = initialState, action) => {
   switch(action) {
      default: 
         return state;
   }
}

export default dashboardReducer;