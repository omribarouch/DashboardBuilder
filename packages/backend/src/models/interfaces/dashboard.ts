import IChart from "./chart";

interface IDashboard {
    name: string;
    creatorUsername: string;
    charts: IChart[];
}

export default IDashboard;