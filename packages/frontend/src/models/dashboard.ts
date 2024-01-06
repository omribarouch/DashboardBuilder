import IChart from "./chart.interface";

export interface IDashboardPreview {
    _id: string;
    name: string;
    creatorUsername: string;
}

export interface IDashboard extends IDashboardPreview {
    charts: IChart[];
}