import Chart from "./chart";

interface Dashboard {
    id: number;
    name: string;
    creatorUsername: string;
    charts: Chart[];
}

export default Dashboard;