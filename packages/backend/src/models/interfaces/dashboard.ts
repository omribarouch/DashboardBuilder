import IChart from "./chart";

interface IDashboard {
    _id: string;
    name: string;
    description: string;
    creatorUsername: string;
    charts: IChart[];
}

export default IDashboard;